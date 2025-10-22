import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <section className="text-center py-16">
      <h1 className="text-3xl sm:text-5xl font-bold mb-4">Mini Project React (Reqres + Auth + Pagination)</h1>
      <p className="text-gray-600 mb-8">Menggunakan React Hooks, Axios, Tailwind 4.1, Protected Routes.</p>
      <div className="flex gap-3 justify-center">
        <Link to="/users" className="btn btn-primary">Lihat Users (Protected)</Link>
        <Link to="/products" className="btn btn-outline">Belanja</Link>
      </div>
    </section>
  )
}
