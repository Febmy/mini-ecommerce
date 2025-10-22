import { useParams, Link } from 'react-router-dom'
import productsData from '../data/products.json'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const product = productsData.find(p => String(p.id) === String(id))
  const { add } = useCart()
  if (!product) return <div className="space-y-3"><p className="text-red-600 font-medium">Produk tidak ditemukan.</p><Link to="/products" className="text-sky-700 underline">Kembali</Link></div>
  return (
    <section className="grid md:grid-cols-2 gap-6">
      <img src={product.image} alt={product.title} className="w-full h-80 object-cover rounded-xl bg-white border" />
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>
        <div className="text-xl font-semibold">Rp {product.price.toLocaleString('id-ID')}</div>
        <button className="btn btn-primary" onClick={() => add(product, 1)}>Tambah ke Keranjang</button>
      </div>
    </section>
  )
}
