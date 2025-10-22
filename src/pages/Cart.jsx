import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { items, setQty, remove, clear, totalPrice } = useCart()
  if (items.length === 0) return (<section className="text-center py-16 space-y-4"><p className="text-gray-600">Keranjang masih kosong.</p><Link to="/products" className="btn btn-primary">Belanja dulu</Link></section>)
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Keranjang</h1>
      <div className="space-y-4">
        {items.map(it => (
          <div key={it.id} className="flex gap-4 items-center border rounded-xl bg-white p-3">
            <img src={it.image} alt={it.title} className="w-20 h-20 object-cover rounded-md" />
            <div className="flex-1">
              <p className="font-medium">{it.title}</p>
              <p className="text-sm text-gray-500">Rp {it.price.toLocaleString('id-ID')}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded border" onClick={() => setQty(it.id, it.qty - 1)}>-</button>
              <input className="w-14 text-center rounded border px-2 py-1" type="number" min="1" value={it.qty} onChange={e => setQty(it.id, Number(e.target.value) || 1)} />
              <button className="px-3 py-1 rounded border" onClick={() => setQty(it.id, it.qty + 1)}>+</button>
            </div>
            <button className="btn btn-outline" onClick={() => remove(it.id)}>Hapus</button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t pt-4">
        <span className="text-lg font-semibold">Total: Rp {totalPrice.toLocaleString('id-ID')}</span>
        <div className="flex gap-2">
          <button className="btn btn-outline" onClick={clear}>Kosongkan</button>
          <button className="btn btn-primary" onClick={() => alert('Checkout berhasil (dummy)!')}>Checkout</button>
        </div>
      </div>
    </section>
  )
}
