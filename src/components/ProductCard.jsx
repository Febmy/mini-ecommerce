import React from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext.jsx'
import SmartImage from './SmartImage.jsx'

export default function ProductCard({ product }) {
  const { has, toggle } = useWishlist()
  const wished = has(product.id)
  return (
    <div className="rounded-2xl border bg-white overflow-hidden flex flex-col relative">
      <button
        onClick={(e)=>{ e.preventDefault(); toggle(product.id) }}
        aria-label={wished ? 'Hapus dari wishlist' : 'Tambahkan ke wishlist'}
        title={wished ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
        className={`absolute top-2 right-2 rounded-full bg-white/90 backdrop-blur px-2 py-1 text-lg shadow ${wished ? 'text-red-600' : 'text-gray-700'}`}
      >
        {wished ? '❤️' : '🤍'}
      </button>
      <SmartImage src={product.image} alt={product.title} className="aspect-square object-cover" />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold line-clamp-2">{product.title}</h3>
        <p className="mt-1 text-sm text-gray-600">{product.category}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-base font-bold">Rp{Number(product.price||0).toLocaleString('id-ID')}</span>
          <Link to={`/products/${product.id}`} className="text-sm px-3 py-1.5 rounded-xl border">Detail</Link>
        </div>
      </div>
    </div>
  )
}
