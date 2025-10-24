import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../services/reqres.js'
export default function Users(){
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)
  useEffect(()=>{
    let on = true
    setLoading(true); setErr(null)
    fetchUsers(page).then(d=> on && setData(d)).catch(e=> on && setErr(e?.response?.data?.error || 'Gagal memuat')).finally(()=> on && setLoading(false))
    return ()=> (on=false)
  },[page])
  if(loading) return <p>Loading...</p>
  if(err) return <p className="text-red-600">{err}</p>
  if(!data) return null
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Users (Reqres)</h2>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.data.map(u => (
          <li key={u.id} className="border rounded-2xl bg-white p-4 flex items-center gap-4">
            <img src={u.avatar} alt={u.first_name} className="w-14 h-14 rounded-full object-cover"/>
            <div className="flex-1">
              <p className="font-medium">{u.first_name} {u.last_name}</p>
              <p className="text-sm text-gray-600">{u.email}</p>
            </div>
            <Link to={`/users/${u.id}`} className="px-3 py-1.5 rounded-2xl border text-sm">Detail</Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="px-3 py-1.5 rounded-2xl border disabled:opacity-50">Prev</button>
        <span className="text-sm text-gray-600">Page {data.page} / {data.total_pages}</span>
        <button disabled={page>=data.total_pages} onClick={()=>setPage(p=>p+1)} className="px-3 py-1.5 rounded-2xl border disabled:opacity-50">Next</button>
      </div>
    </div>
  )
}
