import React, { useMemo, useState } from 'react'
import Container from '../components/Container.jsx'
import SafeImage from '../components/SafeImage.jsx'

export default function CatalogResponsiveExample(){
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('latest')
  const products = useMemo(()=>Array.from({length:32}).map((_,i)=>({
    id:i+1, name:`Produk ${i+1}`, price: 300000 + (i*10000)
  })),[])

  const filtered = useMemo(()=>{
    const q = query.toLowerCase().trim()
    let arr = !q ? products : products.filter(p => p.name.toLowerCase().includes(q))
    if (sort==='price-asc') arr = [...arr].sort((a,b) => a.price - b.price)
    if (sort==='price-desc') arr = [...arr].sort((a,b) => b.price - a.price)
    return arr
  },[products, query, sort])

  return (
    <Container className="py-10">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
        <input
          className="w-full sm:max-w-sm border rounded-2xl px-3 py-2"
          placeholder="Cari produk..."
          value={query} onChange={e=>setQuery(e.target.value)}
        />
        <select
          className="w-full sm:w-48 border rounded-2xl px-3 py-2"
          value={sort} onChange={e=>setSort(e.target.value)}
        >
          <option value="latest">Terbaru</option>
          <option value="price-asc">Harga termurah</option>
          <option value="price-desc">Harga termahal</option>
        </select>
      </div>

      {/* Grid */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map(p => (
          <li key={p.id} className="rounded-2xl border bg-white p-4 hover:shadow-sm transition">
            <div className="aspect-square overflow-hidden rounded-xl mb-3">
              <SafeImage src={`https://picsum.photos/seed/cat-${p.id}/600/600`} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="font-medium">{p.name}</div>
            <div className="text-sm text-gray-600">Rp {p.price.toLocaleString('id-ID')}</div>
          </li>
        ))}
      </ul>
    </Container>
  )
}
