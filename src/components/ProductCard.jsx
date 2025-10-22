import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { add } = useCart()
  return (
    <div className="rounded-xl border bg-white overflow-hidden hover:shadow-md transition">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} className="h-44 w-full object-cover" loading="lazy" />
      </Link>
      <div className="p-4 space-y-2">
        <Link to={`/products/${product.id}`} className="font-medium line-clamp-2 hover:underline">{product.title}</Link>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Rp {product.price.toLocaleString('id-ID')}</span>
          <button className="btn btn-primary" onClick={() => add(product, 1)}>Add</button>
        </div>
      </div>
    </div>
  )
}
