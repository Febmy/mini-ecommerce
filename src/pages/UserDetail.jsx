import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchUser } from '../services/reqres.js'

export default function UserDetail() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    setLoading(true); setError('')
    fetchUser(id).then(({ data }) => {
      if (ignore) return
      setUser(data?.data || null)
    }).catch(e => setError(e?.message || 'Gagal memuat user'))
      .finally(() => setLoading(false))
    return () => { ignore = true }
  }, [id])

  if (loading) return <p className="text-gray-500">Memuat...</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (!user) return <div className="space-y-3"><p className="text-red-600">User tidak ditemukan.</p><Link to="/users" className="text-sky-700 underline">Kembali</Link></div>

  return (
    <section className="max-w-2xl mx-auto bg-white border rounded-xl p-6 grid md:grid-cols-2 gap-6">
      <img src={user.avatar} alt={user.first_name} className="w-full h-60 object-cover rounded-xl" />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{user.first_name} {user.last_name}</h1>
        <p className="text-gray-600">{user.email}</p>
        <Link to="/users" className="btn btn-outline mt-2">Kembali</Link>
      </div>
    </section>
  )
}
