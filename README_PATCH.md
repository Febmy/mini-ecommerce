# Patch PR — Guidance Compliance & Responsiveness

## Yang ditambahkan
- `src/api/reqres.js` — header x-api-key + error handling.
- `src/components/Pagination.jsx` — komponen pagination reusable.
- `src/components/HomePaginationDemo.jsx` — drop-in pagination untuk Home.
- `src/components/SafeImage.jsx` — fallback gambar saat jaringan error.
- `src/components/ProtectedRoute.jsx` — cek token dari context atau localStorage.

## Cara pakai
- **Home pagination:**
  ```jsx
  import HomePaginationDemo from '../components/HomePaginationDemo.jsx'
  <HomePaginationDemo perPage={8} />
  ```

- **SafeImage (gantikan <img>):**
  ```jsx
  import SafeImage from '../components/SafeImage.jsx'
  <SafeImage src="https://images.unsplash.com/..." alt="Banner" className="w-full h-64 object-cover" />
  ```

## Uji cepat
- Register: `eve.holt@reqres.in` / `pistol`
- Login: `eve.holt@reqres.in` / `cityslicka`
- Kosong/salah → error tampil dari API client.

## Responsiveness (Tailwind)
- Grid: `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6`
- Hero: `flex flex-col-reverse lg:flex-row items-center gap-8`
- Container: `container mx-auto px-4`
- Card: `rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition`
