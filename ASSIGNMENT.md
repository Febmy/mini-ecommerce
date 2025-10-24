# Mini Project React — Compliance Notes

Dokumen ini merangkum pemenuhan ketentuan dari *Assignment Guidance*.

## Endpoint Reqres yang digunakan
- **REGISTER — SUCCESSFUL / UNSUCCESSFUL** (`POST /api/register`)
- **LOGIN — SUCCESSFUL / UNSUCCESSFUL** (`POST /api/login`)
- **LIST USERS** (`GET /api/users?page={n}`)
- **SINGLE USER** (`GET /api/users/{id}`)

**Contoh kredensial uji (dari dokumentasi publik):**
- Login sukses: `email: eve.holt@reqres.in`, `password: cityslicka`
- Register sukses: `email: eve.holt@reqres.in`, `password: pistol`

> Catatan: Jika field kosong / email tak terdaftar / password hilang, API akan mengembalikan error 400 yang ditampilkan ke pengguna.

## Fitur Aplikasi
- Register & Login (dengan penanganan *unsuccessful* yang menampilkan pesan error dari API)
- Protected Route (`/users`, `/users/:id`)
- **Users (Reqres) dengan Pagination** (server‑side, parameter `?page=`)
- **[Opsional]** Komponen `HomePaginationDemo` untuk memenuhi literal “pagination di halaman home” tanpa mengubah layout beranda utama.
- Desain responsive (Tailwind)

## Cara uji cepat
1. **Register**: `eve.holt@reqres.in` / `pistol` → sukses, token tersimpan.
2. **Login**: `eve.holt@reqres.in` / `cityslicka` → sukses, token tersimpan.
   - Uji *unsuccessful*: kosongkan password atau pakai email tak terdaftar → muncul pesan error.
3. **Users**: buka `/users?page=1`, gunakan kontrol pagination untuk berpindah halaman.
4. **Detail**: klik `Detail` pada salah satu user.

## Integrasi
- Helper API: `src/api/reqres.js`
- Halaman: `src/pages/Login.jsx`, `src/pages/Register.jsx`, `src/pages/Users.jsx`, `src/pages/UserDetail.jsx`
- Komponen opsional: `src/components/HomePaginationDemo.jsx`

## Catatan implementasi
- Login/Register menyimpan `token` di `localStorage`. ProtectedRoute membaca token untuk mengizinkan akses.
- Error dari API (HTTP !200) ditangkap dan dirender pada UI (sesuai *UNSUCCESSFUL* cases).
