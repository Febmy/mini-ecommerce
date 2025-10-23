import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="text-center py-16 container-narrow space-y-4">
      <h1 className="text-4xl sm:text-5xl font-bold">Mini Project React</h1>
      <p className="text-gray-600">Axios • Tailwind 4.1 • Auth & Protected Routes • Pagination (Reqres)</p>
      <div className="flex gap-3 justify-center">
        <Link to="/users" className="btn btn-primary">Lihat Users (Protected)</Link>
        <Link to="/products" className="btn btn-outline">Belanja</Link>
      </div>
    </section>
  )
}
