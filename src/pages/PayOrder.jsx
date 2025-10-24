import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getOrderById, updateOrder } from '../utils/orders'
import { getPayment } from '../utils/payments'

function currency(n){ return 'Rp' + Number(n||0).toLocaleString('id-ID') }

export default function PayOrder(){
  const { orderId } = useParams()
  const nav = useNavigate()
  const [order, setOrder] = useState(null)
  const [preview, setPreview] = useState('')

  useEffect(() => {
    const o = getOrderById(orderId)
    setOrder(o || null)
  }, [orderId])

  if (!order) {
    return <div className="p-6 border rounded-2xl bg-white text-center text-gray-600">Pesanan tidak ditemukan. <Link className="underline" to="/">Kembali</Link></div>
  }

  const pay = getPayment(order.payment?.method || 'COD')

  function copy(txt){
    navigator.clipboard?.writeText(String(txt)).then(()=>alert('Disalin: ' + txt)).catch(()=>{})
  }

  function onFile(e){
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPreview(String(reader.result || ''))
    reader.readAsDataURL(file)
  }

  function submitProof(){
    if (!preview) { alert('Pilih file bukti terlebih dahulu'); return }
    updateOrder(order.id, { paymentProof: preview, payStatus: 'submitted' })
    alert('Bukti pembayaran dikirim. Menunggu verifikasi (simulasi).')
    nav('/order-success', { state: { orderId: order.id } })
  }

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Bayar Pesanan</h1>
        <div className="text-gray-600">Nomor Pesanan: <b>{order.id}</b></div>
        <div className="text-gray-600">Total: <b>{currency(order.total)}</b></div>
      </header>

      {order.payStatus === 'cod' ? (
        <div className="p-4 rounded-2xl border bg-white">
          <p>Metode: <b>COD (Bayar di Tempat)</b>. Tidak perlu unggah bukti. Kurir akan menagih saat pengantaran.</p>
          <div className="mt-3"><Link to="/" className="px-4 py-2 rounded-2xl bg-brand text-white">Ke Beranda</Link></div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-white p-4 space-y-2">
            <h2 className="font-semibold">Instruksi Pembayaran</h2>
            {pay.type === 'bank' && (
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Bank: <b>{pay.bankName}</b></li>
                <li>No. Rekening: <b>{pay.accountNumber}</b> <button className="text-xs underline" onClick={()=>copy(pay.accountNumber)}>Salin</button></li>
                <li>Nama Penerima: <b>{pay.accountName}</b></li>
                <li>{pay.note || ''}</li>
              </ul>
            )}
            {pay.type === 'ewallet' && (
              <ul className="text-sm text-gray-700 space-y-1">
                <li>E-Wallet: <b>{pay.label}</b></li>
                <li>No. Tujuan: <b>{pay.accountNumber}</b> <button className="text-xs underline" onClick={()=>copy(pay.accountNumber)}>Salin</button></li>
                <li>Atas nama: <b>{pay.accountName}</b></li>
                <li>{pay.note || ''}</li>
              </ul>
            )}
            {pay.type === 'va' && (
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Virtual Account: <b>{pay.vaNumber}</b> <button className="text-xs underline" onClick={()=>copy(pay.vaNumber)}>Salin</button></li>
                <li>{pay.note || ''}</li>
              </ul>
            )}
            <div className="text-sm text-gray-700 pt-2">Total yang dibayar: <b>{currency(order.total)}</b></div>
          </div>

          <div className="rounded-2xl border bg-white p-4 space-y-3">
            <h2 className="font-semibold">Unggah Bukti Pembayaran</h2>
            {order.payStatus === 'submitted' && order.paymentProof ? (
              <div className="space-y-2">
                <div className="text-green-700 text-sm">Bukti sudah dikirim. Jika ingin ganti, unggah ulang di bawah.</div>
                <img src={order.paymentProof} alt="Bukti pembayaran" className="w-full max-w-sm rounded-xl border"/>
              </div>
            ) : null}
            {preview && <img src={preview} alt="Preview bukti" className="w-full max-w-sm rounded-xl border" />}
            <input type="file" accept="image/*" onChange={onFile} />
            <div className="flex gap-2">
              <button onClick={submitProof} className="px-4 py-2 rounded-2xl bg-brand text-white">Kirim Bukti</button>
              <Link to="/" className="px-4 py-2 rounded-2xl border">Nanti Saja</Link>
            </div>
            <p className="text-xs text-gray-500">Ini simulasi: bukti disimpan di browser (localStorage) dan dianggap menunggu verifikasi.</p>
          </div>
        </div>
      )}
    </section>
  )
}
