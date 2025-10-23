import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import productsData from '../data/products.json'

export default function Products() {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('all')
  const [products, setProducts] = useState([])

  useEffect(() => {
    const t = setTimeout(() => setProducts(productsData), 200)
    return () => clearTimeout(t)
  }, [])

  const categories = useMemo(() => ['all', ...Array.from(new Set(products.map(p => p.category)))], [products])
  const filtered = useMemo(() =>
    products.filter(p => (category==='all'||p.category===category) && p.title.toLowerCase().includes(q.toLowerCase()))
  , [products, q, category])

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <h2 className="text-2xl font-bold">Produk</h2>
        <div className="flex gap-2">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari produk..." className="w-full sm:w-72 rounded-lg border px-3 py-2"/>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="rounded-lg border px-3 py-2">
            {categories.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
          </select>
        </div>
      </div>
      {filtered.length === 0 ? <p className="text-gray-500">Tidak ada produk.</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  )
}
