# Miniproject — Mini‑Ecommerce (React + Vite + Tailwind v4)

<p align="left">
  <img alt="React" src="https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="Router" src="https://img.shields.io/badge/React%20Router-6-CA4245?logo=reactrouter&logoColor=white">
  <img alt="Axios" src="https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios&logoColor=white">
</p>

> **Ringkas:** Aplikasi mini‑ecommerce dengan autentikasi demo (Reqres), katalog produk, cart, wishlist, riwayat pesanan, halaman admin (demo), SEO/PWA asset, dan komponen aksesibilitas. Dirancang rapi dengan Context API, hooks, serta utilitas modular.

## 🖼️ Screenshots
![Home — Hero](./public/screenshots/home-hero.png)
![Home — Why us & Collections](./public/screenshots/home-why-collections.png)
![Home — Browse, Promo, Testimonial, Newsletter](./public/screenshots/home-browse-promo.png)
![Products — Grid + Filters](./public/screenshots/products-grid-filters.png)
![Users — Grid + Pagination](./public/screenshots/users-grid.png)
![User Detail — Profile + Tabs](./public/screenshots/user-detail.png)

<figure>
  <img src="/mnt/data/Screenshot 2025-11-24 135040.png" alt="Home — Hero section dengan CTA, badge rating, dan gambar produk utama" width="960" />
  <figcaption><strong>Home</strong> — Hero minimal, CTA, badge rating, dan gambar produk utama.</figcaption>
</figure>

<figure>
  <img src="/mnt/data/Screenshot 2025-11-24 135057.png" alt="Home — Why us & Collections" width="960" />
  <figcaption><strong>Home</strong> — Section "Kenapa memilih kami?" dan <em>Collections</em>.</figcaption>
</figure>

<figure>
  <img src="/mnt/data/Screenshot 2025-11-24 135130.png" alt="Home — Browse Products, banner promo, testimonial, newsletter" width="760" />
  <figcaption><strong>Home</strong> — Browse Products, banner promo musiman, testimonial, dan newsletter.</figcaption>
</figure>

<figure>
  <img src="/mnt/data/Screenshot 2025-11-24 135142.png" alt="Products — Listing dengan filter harga, kategori, sorting" width="760" />
  <figcaption><strong>Products</strong> — Listing dengan filter rentang harga, kategori, dan sorting.</figcaption>
</figure>

<figure>
  <img src="/mnt/data/Screenshot 2025-11-24 135155.png" alt="Users — Grid list dengan pagination" width="760" />
  <figcaption><strong>Users</strong> — Grid list pengguna dengan pagination.</figcaption>
</figure>

<figure>
  <img src="/mnt/data/Screenshot 2025-11-24 135203.png" alt="User Detail — Informasi, tabs overview, wishlist, orders" width="760" />
  <figcaption><strong>User Detail</strong> — Profil, aksi cepat (kontak/kirim email), rating, tabs overview/wishlist/orders.</figcaption>
</figure>

---

## 📝 Deskripsi Proyek
**Miniproject — Mini‑Ecommerce** adalah aplikasi front‑end berbasis **React + Vite** yang menonjolkan arsitektur bersih, mudah dirawat (KISS/DRY/SRP), dan fokus pada praktik **web performance** serta **aksesibilitas**. Proyek ini mencakup alur dasar e‑commerce: daftar produk, detail, keranjang, wishlist, checkout (demo), pesanan, hingga halaman admin untuk melihat detail pesanan (demo).

Backend menggunakan **Reqres** sebagai _mock API_ untuk autentikasi. Data produk saat ini berasal dari **JSON lokal**, namun struktur sudah disiapkan untuk diganti dengan API nyata lewat **`lib/axios.js`** dan **`services/reqres.js`**.

---

## ✨ Fitur Utama
- 🔐 **Auth Demo (Reqres)**: Login/Register mengembalikan token. Token & profil disimpan di LocalStorage.
- 🛒 **Cart & Checkout (demo)**: Tambah/Hapus item, ringkasan total, halaman Checkout & Order Success (simulasi).
- 💙 **Wishlist**: Simpan produk favorit (LocalStorage) via `WishlistContext`.
- 👥 **Users**: Daftar & detail pengguna (demo) — _sample_ page.
- 📦 **Orders**: Riwayat & detail order (demo) + halaman **PayOrder** untuk simulasi pembayaran.
- 🗂️ **Admin (demo)**: `Dashboard` & `AdminOrderDetail` untuk melihat order tertentu.
- 📱 **UI Responsif**: `NavbarResponsive`, contoh halaman `Landing.responsive.example.jsx`, komponen grid/pagination.
- 🧭 **Routing Lengkap**: Public, Protected, dan Admin routes via `routes/index.jsx` dan `ProtectedRoute`.
- 🧩 **Komponen Utilitas**: `SafeImage`/`SmartImage` (optimasi gambar), `Toast` (notifikasi), `ResponsiveTable`, `SkipToContent` (aksesibilitas), `SimplePagination` & `ProductGridWithPagination`.
- 🔎 **SEO / PWA**: `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, berbagai icon (192/512), `hero.webp`.

---

## 🧰 Tech Stack
- **React 18**, **Vite 5**
- **Tailwind CSS v4** via plugin **`@tailwindcss/vite`** (tanpa PostCSS manual)
- **React Router v6**
- **Axios** untuk HTTP
- **LocalStorage** untuk persistensi ringan

---

## 📂 Struktur Proyek (ringkas)
```
public/
├─ assets/                # hero.webp, aset umum
├─ icons/                 # PWA icons (192/512)
├─ images/                # gambar produk/sampel
├─ favicon.ico|svg
├─ manifest.webmanifest
├─ robots.txt
└─ sitemap.xml

src/
├─ api/
│  ├─ reqres.example.js   # contoh konfigurasi env/API
│  └─ reqres.js           # (opsional) integrasi Reqres
├─ assets/
│  └─ products.json       # data produk lokal
├─ components/
│  ├─ Navbar.jsx|NavbarResponsive.jsx
│  ├─ Pagination.jsx|SimplePagination.jsx
│  ├─ ProductCard.jsx|ProductGridWithPagination.jsx
│  ├─ ResponsiveTable.jsx
│  ├─ SafeImage.jsx|SmartImage.jsx
│  ├─ SkipToContent.jsx
│  ├─ ProtectedRoute.jsx
│  └─ Toast.jsx
├─ context/
│  ├─ AuthContext.jsx
│  ├─ CartContext.jsx
│  └─ WishlistContext.jsx
├─ data/
│  └─ products.json       # (alternatif letak data)
├─ hooks/
│  ├─ useLocalStorage.js
│  └─ useOrders.js
├─ lib/
│  └─ axios.js            # axios instance: baseURL + interceptors
├─ pages/
│  ├─ admin/
│  │  └─ AdminOrderDetail.jsx
│  ├─ Cart.jsx
│  ├─ Catalog.jsx | Catalog.responsive.example.jsx
│  ├─ Checkout.jsx
│  ├─ Dashboard.jsx
│  ├─ Home.jsx | Home.pagination.example.jsx | Hero.example.jsx
│  ├─ Landing.jsx | Landing.responsive.example.jsx
│  ├─ Login.jsx | Register.jsx
│  ├─ NotFound.jsx
│  ├─ OrderDetail.jsx | OrderHistory.jsx | OrderSuccess.jsx | PayOrder.jsx
│  ├─ ProductDetail.jsx | Products.jsx
│  ├─ UserDetail.jsx | Users.jsx
│  └─ Wishlist.jsx
├─ routes/
│  └─ index.jsx           # definisi route & guard
├─ services/
│  └─ reqres.js           # layanan API (auth/users)
├─ styles/
│  ├─ index.css           # @import "tailwindcss";
│  └─ mobile-viewport.css # tweak viewport mobile & helpers
├─ utils/
│  ├─ cartUtils.js | cartUtils.test.js
│  ├─ coupons.js | orders.js | payments.js | products.js
│  └─ externalLinkProps.js
├─ App.css | App.jsx | App.lazy.example.jsx
├─ index.css | main.jsx
└─ .env (dibuat dari .env.example)
```

> **Catatan**: Beberapa berkas `*.example.jsx` adalah _showcase_ pola responsive/lazy yang bisa diaktifkan sesuai kebutuhan.

---

## ⚙️ Persiapan & Menjalankan
### Prasyarat
- **Node.js v18+**

### Instalasi
```bash
npm i
# salin env contoh → .env
cp .env.example .env   # mac/linux
# atau (Windows PowerShell)
copy .env.example .env
```

### Variabel Lingkungan (`.env`)
```ini
# Base URL untuk API (default ke Reqres)
VITE_API_BASE_URL=https://reqres.in/api
# API key untuk tier gratis Reqres (wajib)
VITE_REQRES_API_KEY=reqres-free-v1
```

### Menjalankan Dev Server
```bash
npm run dev
```
Aplikasi akan tersedia di URL yang tercetak (umumnya `http://localhost:5173`).

### Build & Preview
```bash
npm run build
npm run preview
```

---

## 🔐 Integrasi API (Reqres)
Semua request memakai header berikut:
```http
x-api-key: reqres-free-v1
```
Contoh endpoint:
- `POST /login` → `{ token }`
- `POST /register` → `{ id, token }`
- `GET /users?page=1` → daftar user (sample)

> **Keamanan**: Token disimpan di LocalStorage untuk kesederhanaan (demo), jangan dipakai di produksi apa adanya.

---

## 🗺️ Pemetaan Route (umum)
**Public**
- `/` (Home/Landing), `/landing` (opsional)
- `/login`, `/register`
- `/products`, `/products/:id`
- `/users`, `/users/:id`
- `/wishlist`

**Protected** *(memerlukan login)*
- `/cart`, `/checkout`
- `/orders`, `/orders/:id`, `/order-success`
- `/pay/:id`

**Admin (demo)**
- `/admin` (Dashboard), `/admin/orders/:id` (AdminOrderDetail)

> Lihat `routes/index.jsx` untuk guard dan struktur pasti yang aktif.

---

## 🧭 Arsitektur & Pola
- **Context API**: `AuthContext`, `CartContext`, `WishlistContext` → state terpusat & persist di LocalStorage.
- **Axios instance**: `lib/axios.js` → baseURL dari env, header `x-api-key`, tempat ideal menambah interceptor (auth/error).
- **Hooks**: `useLocalStorage` (persist sederhana), `useOrders` (abstraksi pemanggilan order API/demo).
- **Komponen Aksesibilitas**: `SkipToContent`, atribut alt/aria pada gambar/link, fokus yang jelas.
- **Gambar & LCP**: `SafeImage`/`SmartImage` untuk konsistensi `src/srcSet/sizes`, gunakan **`public/assets/hero.webp`** untuk hero utama.

---

## 🧪 Testing (opsional)
Repo berisi `utils/cartUtils.test.js`. Bila ingin menjalankan tes dengan **Vitest**:
```bash
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom
```
Tambahkan script di `package.json`:
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```
Jalankan:
```bash
npm run test
```
> Jika memakai Jest, sesuaikan konfigurasi (belum disertakan secara default).

---

## ♿ Aksesibilitas & Kinerja
- **A11y**: `SkipToContent`, label/form terstruktur, `externalLinkProps` untuk tautan eksternal.
- **Perf**: Gunakan aset lokal terkompresi (`.webp`, `.avif`), `loading="lazy"` untuk gambar non‑kritis.
- **SEO/PWA**: sediakan `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, icons 192/512.

Tips Lighthouse:
- Jadikan hero image **LCP** memuat **`eager` + `fetchpriority="high"`** pada komponen hero.
- Hindari image remote besar yang tidak dikompres.

---

## 🚀 Deployment
- **Vercel/Netlify**: build command `npm run build`, publish directory `dist/`.
- Pastikan `VITE_API_BASE_URL` dan `VITE_REQRES_API_KEY` terpasang di _Project Settings_.

---

## 🗺️ Roadmap Singkat
- [ ] Integrasi produk dari API nyata (DummyJSON/FakeStore) + caching
- [ ] Kontrol kuantitas di Cart (increment/decrement)
- [ ] Toast global & Error Boundary
- [ ] Halaman Admin yang lebih lengkap (statistik)
- [ ] E2E test (Playwright)

---

## 🤝 Kontribusi
PR dipersilakan. Ikuti gaya commit konvensional dan jaga perubahan tetap fokus.

---

## 📜 Lisensi
MIT © 2025 — Your Name

---

## 🔖 Deskripsi Singkat untuk kolom “About” GitHub
**Mini‑ecommerce React + Vite + Tailwind v4 dengan auth Reqres, cart, wishlist, orders, admin demo, SEO/PWA assets, dan komponen aksesibilitas.**

