import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { fetchUsers } from '../services/reqres.js'

export default function Users() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [params, setParams] = useSearchParams()

  useEffect(() => {
    const p = Number(params.get('page') || 1)
    setPage(p)
  }, [params])

  useEffect(() => {
    let ignore = false
    setLoading(true); setError('')
    fetchUsers(page).then(({ data }) => {
      if (ignore) return
      setUsers(data?.data || [])
      setTotalPages(data?.total_pages || 1)
    }).catch(e => setError(e?.message || 'Gagal memuat users'))
      .finally(() => setLoading(false))
    return () => { ignore = true }
  }, [page])

  const go = (p) => {
    const np = Math.max(1, Math.min(totalPages, p))
    setParams({ page: String(np) })
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users (Pagination)</h1>
        <div className="text-sm text-gray-600">Page {page} / {totalPages}</div>
      </div>

      {loading && <p className="text-gray-500">Memuat...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(u => (
            <Link key={u.id} to={`/users/${u.id}`} className="border bg-white rounded-xl p-4 flex gap-4 items-center hover:shadow transition">
              <img src={u.avatar} alt={u.first_name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="font-medium">{u.first_name} {u.last_name}</p>
                <p className="text-sm text-gray-600">{u.email}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <button className="btn btn-outline" onClick={() => go(page - 1)} disabled={page<=1}>Prev</button>
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => go(n)} className={'px-3 py-1 rounded border ' + (n===page ? 'bg-sky-600 text-white border-sky-600' : 'bg-white')}>
              {n}
            </button>
          ))}
        </div>
        <button className="btn btn-outline" onClick={() => go(page + 1)} disabled={page>=totalPages}>Next</button>
      </div>
    </section>
  )
}
