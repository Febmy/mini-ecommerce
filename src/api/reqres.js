// src/api/reqres.js
const BASE = 'https://reqres.in/api';

const COMMON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': 'reqres-free-v1', // required by reqres free plan
};

// 'api' (default) -> call reqres endpoints; 'local' -> offline/demo (no network)
function authMode() {
  return (import.meta?.env?.VITE_AUTH_MODE || 'api').toLowerCase();
}

async function parseJSON(res) {
  try { return await res.json(); } catch { return {}; }
}

async function handle(res) {
  const data = await parseJSON(res);
  if (!res.ok) {
    const msg =
      data?.error ||
      data?.message ||
      (res.status === 400 || res.status === 401
        ? 'Email atau password salah'
        : `HTTP ${res.status}`);
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

function ensureFilled(email, password) {
  const e = String(email || '').trim();
  const p = String(password || '').trim();
  if (!e || !p) throw new Error('Email dan password wajib diisi');
  return { e, p };
}

// === LOGIN ===
export async function reqresLogin({ email, password }) {
  const { e, p } = ensureFilled(email, password);

  if (authMode() === 'local') {
    // offline/demo without hitting network
    return { token: 'local-demo-token' };
  }

  try {
    const res = await fetch(`${BASE}/login`, {
      method: 'POST',
      headers: COMMON_HEADERS,
      body: JSON.stringify({ email: e, password: p }),
    });
    return await handle(res); // { token }
  } catch (err) {
    const m = String(err?.message || '').toLowerCase();
    if (m.includes('failed to fetch') || m.includes('name_not_resolved') || m.includes('network') || m.includes('dns')) {
      throw new Error('Tidak bisa terhubung ke reqres.in (DNS/Jaringan). Coba ganti jaringan/VPN atau set VITE_AUTH_MODE=local untuk demo.');
    }
    throw err;
  }
}

// === REGISTER ===
export async function reqresRegister({ email, password }) {
  const { e, p } = ensureFilled(email, password);

  if (authMode() === 'local') {
    return { id: 1, token: 'local-demo-token' };
  }

  try {
    const res = await fetch(`${BASE}/register`, {
      method: 'POST',
      headers: COMMON_HEADERS,
      body: JSON.stringify({ email: e, password: p }),
    });
    return await handle(res); // { id, token }
  } catch (err) {
    const m = String(err?.message || '').toLowerCase();
    if (m.includes('failed to fetch') || m.includes('name_not_resolved') || m.includes('network') || m.includes('dns')) {
      throw new Error('Tidak bisa terhubung ke reqres.in (DNS/Jaringan). Coba ganti jaringan/VPN atau set VITE_AUTH_MODE=local untuk demo.');
    }
    throw err;
  }
}

// === USERS (GET) ===
export async function listUsers(page = 1) {
  try {
    const res = await fetch(`${BASE}/users?page=${page}`, { headers: COMMON_HEADERS });
    return await handle(res);
  } catch (err) {
    const m = String(err?.message || '').toLowerCase();
    if (m.includes('failed to fetch') || m.includes('name_not_resolved') || m.includes('network') || m.includes('dns')) {
      throw new Error('Tidak bisa memuat users dari reqres.in (DNS/Jaringan).');
    }
    throw err;
  }
}

export async function getUser(id) {
  try {
    const res = await fetch(`${BASE}/users/${id}`, { headers: COMMON_HEADERS });
    return await handle(res);
  } catch (err) {
    const m = String(err?.message || '').toLowerCase();
    if (m.includes('failed to fetch') || m.includes('name_not_resolved') || m.includes('network') || m.includes('dns')) {
      throw new Error('Tidak bisa memuat user dari reqres.in (DNS/Jaringan).');
    }
    throw err;
  }
}
