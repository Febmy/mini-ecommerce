import React, { useMemo } from 'react'
import { useWishlist } from '../context/WishlistContext.jsx'
import { getAllProducts } from '../utils/products'
import ProductCard from '../components/ProductCard.jsx'
import { Link } from 'react-router-dom'

export default function Wishlist(){
  const { ids, clear } = useWishlist()
  const all = getAllProducts()
  const items = useMemo(() => all.filter(p => ids.includes(p.id)), [all, ids])

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Wishlist</h2>
        {items.length > 0 && <button onClick={clear} className="px-3 py-2 rounded-2xl border text-sm">Bersihkan</button>}
      </div>
      {items.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="p-6 border rounded-2xl bg-white text-center text-gray-600">
          Belum ada item di wishlist. <Link to="/products" className="underline">Lihat produk</Link>
        </div>
      )}
    </section>
  )
}
