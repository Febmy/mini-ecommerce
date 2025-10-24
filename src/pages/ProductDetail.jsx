import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getAllProducts } from '../utils/products'
import { useCart } from '../context/CartContext.jsx'
import SmartImage from '../components/SmartImage.jsx'

export default function ProductDetail(){
  const { id } = useParams()
  const { add } = useCart()
  const product = getAllProducts().find(p => p.id === Number(id))
  if(!product) return <p>Produk tidak ditemukan.</p>
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <SmartImage src={product.image} alt={product.title} className="rounded-2xl w-full object-cover"/>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.category}</p>
        <p className="text-2xl font-bold">Rp{Number(product.price||0).toLocaleString('id-ID')}</p>
        <div className="flex gap-3">
          <button onClick={()=>add(product)} className="px-4 py-2 rounded-2xl bg-brand text-white">Tambah ke Cart</button>
          <Link to="/products" className="px-4 py-2 rounded-2xl border">Kembali</Link>
        </div>
      </div>
    </div>
  )
}
