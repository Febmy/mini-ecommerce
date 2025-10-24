import React, { useMemo, useState } from 'react'

const SAMPLE = Array.from({ length: 24 }).map((_, i) => ({
  id: i+1, title: `Highlight #${i+1}`, desc: 'Contoh item untuk demo pagination di Home'
}))

export default function HomePaginationDemo({ perPage = 6 }){
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(SAMPLE.length / perPage)
  const items = useMemo(() => {
    const start = (page-1) * perPage
    return SAMPLE.slice(start, start + perPage)
  }, [page, perPage])

  return (
    <section className="space-y-3 mt-8">
      <h2 className="text-xl font-semibold">Highlight (Demo Pagination Home)</h2>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(it => (
          <li key={it.id} className="rounded-2xl border bg-white p-4">
            <div className="font-medium">{it.title}</div>
            <div className="text-sm text-gray-600">{it.desc}</div>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <button className="px-3 py-1.5 rounded-xl border disabled:opacity-50" disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i} className={`px-3 py-1.5 rounded-xl border ${page===i+1 ? 'bg-brand text-white' : ''}`} onClick={()=>setPage(i+1)}>{i+1}</button>
        ))}
        <button className="px-3 py-1.5 rounded-xl border disabled:opacity-50" disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </section>
  )
}
