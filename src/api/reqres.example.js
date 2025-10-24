// Example client (use this if your file is missing the functions)
const BASE = 'https://reqres.in/api';
const COMMON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': 'reqres-free-v1',
};

async function handle(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error || data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export async function listUsers(page = 1) {
  const res = await fetch(`${BASE}/users?page=${page}`, { headers: COMMON_HEADERS });
  return handle(res);
}

export async function getUser(id) {
  const res = await fetch(`${BASE}/users/${id}`, { headers: COMMON_HEADERS });
  return handle(res);
}
