import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function currency(n){ return 'Rp' + Number(n||0).toLocaleString('id-ID') }

export default function Cart(){
  const { items = [], remove, clear } = useCart() || {}
  const subtotal = items.reduce((s, it) => s + (Number(it.price)||0) * (Number(it.qty||1)), 0)

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Keranjang</h1>

      {items.length ? (
        <div className="grid lg:grid-cols-3 gap-6">
          <ul className="lg:col-span-2 space-y-3">
            {items.map((it, idx) => (
              <li key={idx} className="rounded-2xl border bg-white p-3 flex gap-3 items-center">
                <img src={it.image} alt={it.title} className="w-20 h-20 object-cover rounded-xl border"/>
                <div className="flex-1">
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-sm text-gray-600">{currency(it.price)} × {it.qty || 1}</div>
                </div>
                {remove && <button onClick={()=>remove(it.id)} className="px-3 py-1.5 rounded-xl border text-sm">Hapus</button>}
              </li>
            ))}
          </ul>
          <aside className="space-y-3">
            <div className="rounded-2xl border bg-white p-4 space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
              <Link to="/checkout" className="block text-center mt-2 px-4 py-2 rounded-2xl bg-brand text-white">Lanjut ke Checkout</Link>
            </div>
            {clear && <button onClick={clear} className="w-full px-4 py-2 rounded-2xl border">Kosongkan Keranjang</button>}
          </aside>
        </div>
      ) : (
        <div className="p-6 border rounded-2xl bg-white text-center text-gray-600">
          Keranjang masih kosong. <Link to="/products" className="underline">Belanja sekarang</Link>
        </div>
      )}
    </section>
  )
}
