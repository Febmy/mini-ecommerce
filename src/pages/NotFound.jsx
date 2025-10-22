import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <section className="text-center py-16 space-y-3">
      <h1 className="text-3xl font-bold">404</h1>
      <p>Halaman tidak ditemukan.</p>
      <Link to="/" className="text-sky-700 underline">Kembali ke beranda</Link>
    </section>
  )
}
