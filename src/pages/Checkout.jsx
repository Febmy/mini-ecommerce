import React, { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { findCoupon, evaluateCoupon } from '../utils/coupons'
import { saveOrder, newOrderId } from '../utils/orders'
import { listPayments, getPayment } from '../utils/payments'

function currency(n){ return 'Rp' + Number(n||0).toLocaleString('id-ID') }

export default function Checkout(){
  const nav = useNavigate()
  const cart = useCart() || {}
  const items = Array.isArray(cart.items) ? cart.items : []
  const subtotal = items.reduce((s, it) => s + (Number(it.price)||0) * (Number(it.qty||1)), 0)

  const [shipping, setShipping] = useState('standard') // standard|express
  const [couponInput, setCouponInput] = useState('')
  const [couponState, setCouponState] = useState({ applied: null, result: null, error: '' })

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    address: '', city: '', province: '', postal: '',
  })

  const [paymentCode, setPaymentCode] = useState('COD')
  const payments = listPayments()
  const payment = getPayment(paymentCode)

  const shippingFee = useMemo(() => {
    if (couponState.result?.freeShipping) return 0
    return shipping === 'express' ? 40000 : 20000
  }, [shipping, couponState.result])

  const discount = useMemo(() => {
    return couponState.result?.discount || 0
  }, [couponState.result])

  const total = Math.max(0, subtotal - discount + shippingFee)

  function applyCoupon(){
    const c = findCoupon(couponInput)
    const result = evaluateCoupon(c, subtotal)
    if (!result.valid) {
      setCouponState({ applied: null, result: null, error: result.reason || 'Kupon tidak valid' })
    } else {
      setCouponState({ applied: c, result, error: '' })
    }
  }

  function clearCoupon(){
    setCouponInput('')
    setCouponState({ applied: null, result: null, error: '' })
  }

  function onSubmit(e){
    e.preventDefault()
    if (!items.length) { alert('Keranjang masih kosong'); return }
    const required = ['name','phone','address','city','province','postal']
    const missing = required.filter(k => !String(form[k]).trim())
    if (missing.length) { alert('Mohon lengkapi data pengiriman'); return }

    const order = {
      id: newOrderId(),
      createdAt: new Date().toISOString(),
      items: items.map(it => ({ id: it.id, title: it.title, price: it.price, qty: it.qty || 1, image: it.image })),
      subtotal,
      discount,
      shipping: shippingFee,
      total,
      shippingMethod: shipping,
      coupon: couponState.applied?.code || null,
      customer: { ...form },
      payment: { method: payment.code, type: payment.type },
      payStatus: payment.type === 'cod' ? 'cod' : 'unpaid',
    }
    saveOrder(order)
    if (cart.clear) cart.clear()
    nav('/order-success', { state: { orderId: order.id } })
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left: form */}
      <form onSubmit={onSubmit} className="lg:col-span-2 space-y-4">
        <div className="rounded-2xl border bg-white p-4 space-y-3">
          <h2 className="text-lg font-semibold">Data Penerima</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <input className="border rounded-2xl px-3 py-2" placeholder="Nama lengkap" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} />
            <input className="border rounded-2xl px-3 py-2" placeholder="No. HP" value={form.phone} onChange={e=>setForm(f=>({...f, phone:e.target.value}))} />
            <input className="border rounded-2xl px-3 py-2 sm:col-span-2" placeholder="Email (opsional)" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} />
            <input className="border rounded-2xl px-3 py-2 sm:col-span-2" placeholder="Alamat lengkap" value={form.address} onChange={e=>setForm(f=>({...f, address:e.target.value}))} />
            <input className="border rounded-2xl px-3 py-2" placeholder="Kota/Kabupaten" value={form.city} onChange={e=>setForm(f=>({...f, city:e.target.value}))} />
            <input className="border rounded-2xl px-3 py-2" placeholder="Provinsi" value={form.province} onChange={e=>setForm(f=>({...f, province:e.target.value}))} />
            <input className="border rounded-2xl px-3 py-2" placeholder="Kode Pos" value={form.postal} onChange={e=>setForm(f=>({...f, postal:e.target.value}))} />
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-4 space-y-3">
          <h2 className="text-lg font-semibold">Pengiriman</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="ship" checked={shipping==='standard'} onChange={()=>setShipping('standard')} />
              <span>Reguler (2–4 hari) — {currency(20000)}</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="ship" checked={shipping==='express'} onChange={()=>setShipping('express')} />
              <span>Express (1–2 hari) — {currency(40000)}</span>
            </label>
            {couponState.result?.freeShipping && <div className="text-sm text-green-600">Kupon memberi <b>Gratis Ongkir</b> — biaya pengiriman jadi Rp0</div>}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-4 space-y-3">
          <h2 className="text-lg font-semibold">Pembayaran</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {payments.map(p => (
              <label key={p.code} className="flex items-center gap-2 border rounded-2xl px-3 py-2 cursor-pointer">
                <input type="radio" name="pay" checked={paymentCode===p.code} onChange={()=>setPaymentCode(p.code)} />
                <div className="flex items-center justify-between w-full">
                  <span>{p.label}</span>
                  <span className="text-xs text-gray-500">{p.type.toUpperCase()}</span>
                </div>
              </label>
            ))}
          </div>
          {payment.type !== 'cod' && (
            <div className="text-sm text-gray-700">
              Instruksi akan muncul setelah membuat pesanan. Kamu bisa unggah bukti pembayaran di halaman <b>Bayar Pesanan</b>.
            </div>
          )}
        </div>

        <div className="rounded-2xl border bg-white p-4 space-y-3">
          <h2 className="text-lg font-semibold">Kupon</h2>
          <div className="flex gap-2">
            <input value={couponInput} onChange={e=>setCouponInput(e.target.value)} placeholder="Masukkan kode kupon" className="border rounded-2xl px-3 py-2 flex-1"/>
            <button type="button" onClick={applyCoupon} className="px-3 py-2 rounded-2xl border">Terapkan</button>
            {couponState.applied && <button type="button" onClick={clearCoupon} className="px-3 py-2 rounded-2xl border">Hapus</button>}
          </div>
          {couponState.error && <div className="text-sm text-red-600">{couponState.error}</div>}
          {couponState.result && !couponState.error && (
            <div className="text-sm text-green-700">Kupon <b>{couponState.result.code}</b> aktif: diskon {currency(couponState.result.discount)} {couponState.result.freeShipping ? '+ Gratis Ongkir' : ''}</div>
          )}
        </div>

        <div className="flex gap-2">
          <Link to="/cart" className="px-4 py-2 rounded-2xl border">Kembali ke Cart</Link>
          <button className="px-4 py-2 rounded-2xl bg-brand text-white">Buat Pesanan</button>
        </div>
      </form>

      {/* Right: summary */}
      <aside className="space-y-3">
        <div className="rounded-2xl border bg-white p-4 space-y-3">
          <h2 className="text-lg font-semibold">Ringkasan</h2>
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
          <div className="flex justify-between text-sm"><span>Diskon</span><span>- {currency(discount)}</span></div>
          <div className="flex justify-between text-sm"><span>Ongkir</span><span>{currency(shippingFee)}</span></div>
          <div className="h-px bg-gray-200 my-1"></div>
          <div className="flex justify-between font-semibold"><span>Total</span><span>{currency(Math.max(0, subtotal - discount + shippingFee))}</span></div>
          <div className="text-xs text-gray-500">Metode bayar: <b>{payment.label}</b></div>
        </div>

        <div className="rounded-2xl border bg-white p-4 text-sm text-gray-600">
          <p><b>Catatan:</b> Pembayaran dummy. Setelah klik "Buat Pesanan", kamu akan melihat instruksi sesuai metode pembayaran.</p>
        </div>
      </aside>
    </div>
  )
}
