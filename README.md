# Mini E‑commerce (Axios + Tailwind 4.1 + React Router)

**Siap pakai** untuk menggantikan repo `mini-ecommerce` kamu agar rapi dan jalan mulus.

## Fitur
- Auth (Reqres): login/register (sukses & gagal), token tersimpan.
- Protected routes: `/users`, `/users/:id`.
- List Users + Detail (pagination).
- Halaman e‑commerce demo (Products, Product Detail, Cart).
- Tailwind **v4.1** (stabil via PostCSS plugin), React Router `^6.30.1` (future flags aktif).

## Jalankan
```bash
npm install
npm run dev
```

## Troubleshooting
- **500 di index.css** → pastikan ada `postcss.config.cjs` & `tailwind.config.cjs`, lalu ulangi `npm install`.
- **axios tidak ketemu** → `npm ls axios`, bila tidak ada: `npm i axios`.
- Node versi **>= 18.18**.

## Struktur
```
src/
  components/ (Navbar, Footer, ProtectedRoute, ProductCard)
  context/ (AuthContext, CartContext)
  services/ (reqres.js - axios)
  pages/ (Home, Login, Register, Users, UserDetail, Products, ProductDetail, Cart, NotFound)
  App.jsx, main.jsx, index.css
```

## Push ke GitHub
```bash
git init
git add .
git commit -m "chore: clean mini-ecommerce (axios + tailwind 4.1 + reqres auth + pagination)"
git branch -M main
git remote add origin https://github.com/Febmy/mini-ecommerce.git
git push -u origin main
```
