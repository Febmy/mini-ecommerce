// src/api/reqres.js — robust client for Reqres (free plan)
const BASE = 'https://reqres.in/api';

const COMMON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': 'reqres-free-v1', // required for the free plan
};

async function parseJSON(res) {
  try { return await res.json(); } catch { return {}; }
}

async function handle(res) {
  const data = await parseJSON(res);
  if (!res.ok) {
    const msg = data?.error || data?.message ||
      (res.status === 400 || res.status === 401 ? 'Email atau password salah' : `HTTP ${res.status}`);
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

function requireFilled(email, password) {
  const e = String(email || '').trim();
  const p = String(password || '').trim();
  if (!e || !p) throw new Error('Email dan password wajib diisi');
  return { e, p };
}

export async function reqresLogin({ email, password }) {
  const { e, p } = requireFilled(email, password);
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: COMMON_HEADERS,
    body: JSON.stringify({ email: e, password: p }),
  });
  return handle(res); // { token }
}

export async function reqresRegister({ email, password }) {
  const { e, p } = requireFilled(email, password);
  const res = await fetch(`${BASE}/register`, {
    method: 'POST',
    headers: COMMON_HEADERS,
    body: JSON.stringify({ email: e, password: p }),
  });
  return handle(res); // { id, token }
}

export async function listUsers(page = 1) {
  const res = await fetch(`${BASE}/users?page=${page}`, { headers: COMMON_HEADERS });
  return handle(res);
}

export async function getUser(id) {
  const res = await fetch(`${BASE}/users/${id}`, { headers: COMMON_HEADERS });
  return handle(res);
}
