import React, { useEffect, useMemo, useRef, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { getAllProducts } from '../utils/products'

function useOutsideClose(ref, onClose) {
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose?.()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [ref, onClose])
}

function MultiSelect({ label='Kategori', options=[], selected=[], onChange }) {
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)
  useOutsideClose(boxRef, () => setOpen(false))

  const selectedSet = new Set(selected)
  const selectedCount = selected.length === 0 ? 'Semua' : selected.length

  function toggle(val){
    const next = selectedSet.has(val) ? selected.filter(v => v !== val) : [...selected, val]
    onChange(next)
  }
  function selectAll(){ onChange([]) }     // empty = all
  function clearAll(){ onChange([...options.map(o => o.value)]) } // show none (not used by filter, but we keep for UX parity)

  return (
    <div className="relative" ref={boxRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={()=>setOpen(o=>!o)}
        className="flex items-center gap-2 border rounded-2xl px-3 py-2 w-full sm:w-56 justify-between"
      >
        <span className="truncate">{label}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100">{selectedCount}</span>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-[18rem] sm:w-72 rounded-2xl border bg-white shadow-lg p-2">
          <div className="max-h-64 overflow-auto space-y-1">
            <label className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                className="rounded"
                checked={selected.length===0}
                onChange={selectAll}
              />
              <span className="flex-1">Semua</span>
              <span className="text-xs text-gray-500">{options.reduce((a,b)=>a+b.count,0)}</span>
            </label>
            <div className="h-px bg-gray-200 my-1" />
            {options.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={selected.length===0 ? true : selectedSet.has(opt.value)}
                  onChange={()=>toggle(opt.value)}
                />
                <span className="flex-1">{opt.value}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100">{opt.count}</span>
              </label>
            ))}
          </div>
          <div className="flex items-center justify-between gap-2 pt-2 px-1">
            <button onClick={selectAll} className="text-sm px-3 py-1.5 rounded-xl border">Semua</button>
            <button onClick={()=>setOpen(false)} className="text-sm px-3 py-1.5 rounded-xl bg-brand text-white">Terapkan</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Products(){
  const all = getAllProducts()

  // category counts
  const categories = useMemo(() => {
    const map = new Map()
    for (const p of all) map.set(p.category, (map.get(p.category)||0) + 1)
    return Array.from(map.entries()).sort((a,b)=>a[0].localeCompare(b[0])).map(([name, count]) => ({ value: name, count }))
  }, [all])

  // price bounds
  const prices = all.map(p => Number(p.price)||0)
  const MIN = prices.length ? Math.min(...prices) : 0
  const MAX = prices.length ? Math.max(...prices) : 0

  // states
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('relevance')
  const [selectedCats, setSelectedCats] = useState([]) // empty => all
  const [minPrice, setMinPrice] = useState(MIN)
  const [maxPrice, setMaxPrice] = useState(MAX)

  function resetFilters(){
    setQ('')
    setSort('relevance')
    setSelectedCats([])
    setMinPrice(MIN)
    setMaxPrice(MAX)
  }

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    const sel = new Set(selectedCats)
    let items = all.filter(p => {
      const inQuery = !query || p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
      const catOk = selectedCats.length === 0 ? true : sel.has(p.category)
      const price = Number(p.price)||0
      const inPrice = price >= (minPrice||MIN) && price <= (maxPrice||MAX)
      return inQuery && catOk && inPrice
    })
    switch (sort) {
      case 'price-asc':  items = [...items].sort((a,b)=>a.price-b.price); break
      case 'price-desc': items = [...items].sort((a,b)=>b.price-a.price); break
      case 'name-asc':   items = [...items].sort((a,b)=>a.title.localeCompare(b.title)); break
      case 'name-desc':  items = [...items].sort((a,b)=>b.title.localeCompare(a.title)); break
      default:
        if (query) items = [...items].sort((a,b)=> (a.title.toLowerCase().indexOf(query) === -1 ? 9999 : a.title.toLowerCase().indexOf(query)) - (b.title.toLowerCase().indexOf(query) === -1 ? 9999 : b.title.toLowerCase().indexOf(query)))
    }
    return items
  }, [all, q, sort, selectedCats, minPrice, maxPrice, MIN, MAX])

  return (
    <section className="space-y-3">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-end lg:justify-between">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari produk..." className="flex-1 sm:w-48 border rounded-2xl px-3 py-2"/>
          <MultiSelect
            label="Kategori"
            options={categories}
            selected={selectedCats}
            onChange={setSelectedCats}
          />
          <select value={sort} onChange={e=>setSort(e.target.value)} className="border rounded-2xl px-3 py-2">
            <option value="relevance">Relevansi</option>
            <option value="price-asc">Harga: termurah</option>
            <option value="price-desc">Harga: termahal</option>
            <option value="name-asc">Nama: A–Z</option>
            <option value="name-desc">Nama: Z–A</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Harga:</span>
          <input type="number" min={MIN} max={MAX} value={minPrice} onChange={e=>setMinPrice(Number(e.target.value)||MIN)} className="w-28 border rounded-2xl px-3 py-2" />
          <span className="text-sm text-gray-400">—</span>
          <input type="number" min={MIN} max={MAX} value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value)||MAX)} className="w-28 border rounded-2xl px-3 py-2" />
        </div>
        <button onClick={resetFilters} className="px-3 py-2 rounded-2xl border text-sm">Reset</button>
        <span className="text-sm text-gray-600 ml-auto">{filtered.length} produk</span>
      </div>

      {filtered.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="p-6 border rounded-2xl bg-white text-center text-gray-600">Tidak ada hasil yang cocok.</div>
      )}
    </section>
  )
}
