# Mini Project React — Reqres + Tailwind 4.1 + Axios

Mengimplementasikan **guidance**: Auth (Login/Register), List Users + Detail (Reqres), **pagination**, **Protected Routes**, responsive design, React Hooks, axios.

## Endpoint yang dipakai (Reqres)
- **REGISTER - SUCCESSFUL / UNSUCCESSFUL** → `POST /register`
- **LOGIN - SUCCESSFUL / UNSUCCESSFUL** → `POST /login`
- **LIST USERS** → `GET /users?page=1..n`
- **SINGLE USER** → `GET /users/:id`

## Cara jalan
```bash
npm install
npm run dev
```
Buka `http://localhost:5173`.

## Akun contoh
- Login sukses: `eve.holt@reqres.in` + `cityslicka`
- Register sukses: `eve.holt@reqres.in` + `pistol`
- Untuk skenario gagal: kosongkan password → API akan mengembalikan error.

## Tech
- React 18, Vite 5
- Tailwind **4.1** (config CJS untuk kompatibilitas)
- React Router v6
- Axios (services/reqres.js)
- Context API + Hooks (Auth, Cart)
