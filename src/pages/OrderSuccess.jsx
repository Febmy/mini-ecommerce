import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { getOrderById } from '../utils/orders'
import { getPayment } from '../utils/payments'

export default function OrderSuccess(){
  const loc = useLocation()
  const orderId = loc.state?.orderId
  const [order, setOrder] = useState(null)

  useEffect(() => { if (orderId) setOrder(getOrderById(orderId)) }, [orderId])

  return (
    <section className="max-w-xl mx-auto text-center space-y-4">
      <div className="text-5xl">✅</div>
      <h1 className="text-2xl font-bold">Pesanan Berhasil Dibuat</h1>
      {orderId && <p className="text-gray-700">Nomor Pesanan: <b>{orderId}</b></p>}
      {order && <p className="text-gray-700">Total: <b>Rp{Number(order.total||0).toLocaleString('id-ID')}</b></p>}
      {order && order.payment && (
        <div className="text-sm text-gray-700">
          Metode bayar: <b>{getPayment(order.payment.method).label}</b>
          {order.payStatus !== 'cod' && (
            <div className="mt-1">
              Silakan lanjutkan pembayaran dan unggah bukti di halaman{' '}
              <Link to={`/pay/${order.id}`} className="underline">Bayar Pesanan</Link>.
            </div>
          )}
        </div>
      )}
      <div className="flex gap-2 justify-center pt-2">
        <Link to="/products" className="px-4 py-2 rounded-2xl border">Belanja Lagi</Link>
        <Link to="/" className="px-4 py-2 rounded-2xl bg-brand text-white">Ke Beranda</Link>
      </div>
    </section>
  )
}
