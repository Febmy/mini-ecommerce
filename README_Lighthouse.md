# Patch: Lighthouse Boost (Performance, SEO, Accessibility, Best Practices)

Patch ini menambahkan file dan contoh perubahan supaya skor Lighthouse melewati:
- Performance > 90
- SEO > 90
- Accessibility > 80
- Best Practices > 80

## Cara pakai
1. **Backup dulu** project kamu.
2. Salin isi patch ini ke root project (boleh overwrite `index.html`).
3. (Opsional) Pindahkan komponen:
   - `src/components/SkipToContent.jsx`
   - `src/components/SafeImage.jsx`
   - `src/pages/Hero.example.jsx` → Sesuaikan jadi komponen Hero kamu.
   - `src/services/reqres.js` → Ganti import di komponen/service yg pakai Reqres.
   - `src/utils/externalLinkProps.js`
4. Pastikan elemen utama halaman dibungkus `<main id="content">…</main>`.
5. Lazy-load route: lihat `src/App.lazy.example.jsx` dan adaptasikan di `src/App.jsx`.
6. Konversi gambar hero ke WebP/AVIF dan ganti path di `Hero.example.jsx` (atau Hero milikmu).
7. Jalankan audit dari build:
   ```bash
   npm install
   npm run build
   npm run preview   # buka http://localhost:4173
   ```
   Buka Chrome DevTools → Lighthouse → Desktop → centang ke-4 kategori → Run.

## Catatan implementasi
- **Images**: gunakan `<SafeImage>` untuk gambar non-hero (lazy + decoding async + dimensi).
- **Hero/LCP**: pakai `fetchpriority="high"` dan `srcSet`/`sizes` agar LCP cepat.
- **Form**: pastikan tiap input punya `<label htmlFor="...">` dan `autoComplete` sesuai.
- **Link eksternal**: gunakan `externalLinkProps()` untuk menambah `rel="noopener noreferrer"`.
- **Console bersih**: gunakan `fetchUsersSafe`/`loginSafe` saat dev agar tidak ada error 401.

Semoga membantu dan selamat berburu skor! 🚀
