import React, { useMemo, useState } from 'react'
import base from '../../assets/products.json'
import { saveOverride, clearOverride, getOverrides } from '../../utils/products'
import { Link } from 'react-router-dom'

function normalize(u='') {
  let s = String(u || '').trim()
  if (!s) return s
  if (/^http:\/\//i.test(s)) s = s.replace(/^http:/i, 'https:')
  if (/^\/\//.test(s)) s = 'https:' + s
  if (!/^data:|^blob:|^https?:\/\//i.test(s)) {
    if (s.startsWith('/')) return s
    s = '/images/' + s
  }
  return s
}

export default function FixBaseImages() {
  const [q, setQ] = useState('')
  const overrides = getOverrides()
  const list = useMemo(() => {
    const query = q.trim().toLowerCase()
    return base
      .filter(p => !query || p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query))
      .slice(0, 50) // safety
  }, [q])

  function onFileChange(id, e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      saveOverride(id, { image: reader.result })
      alert('Gambar di-update untuk ID ' + id)
    }
    reader.readAsDataURL(file)
  }

  function onSaveUrl(id) {
    const input = document.getElementById('img-' + id)
    const url = normalize(input?.value || '')
    if (!url) { alert('Masukkan URL atau upload file'); return }
    saveOverride(id, { image: url })
    alert('Gambar di-update untuk ID ' + id)
  }

  function onReset(id) {
    clearOverride(id)
    alert('Override untuk ID ' + id + ' dihapus (kembali pakai data asli).')
  }

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Perbaiki Gambar Produk Bawaan</h1>
        <Link to="/admin/products" className="px-3 py-2 rounded-2xl border text-sm">Kembali ke Admin Produk</Link>
      </header>

      <p className="text-gray-600">Gunakan halaman ini untuk mengganti gambar <b>produk bawaan</b> (bukan produk custom). Perubahan hanya disimpan di browser ini (localStorage).</p>

      <div className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari produk bawaan..." className="border rounded-2xl px-3 py-2 w-full sm:w-80"/>
      </div>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(p => {
          const ov = overrides[p.id] || {}
          const current = ov.image || p.image
          return (
            <li key={p.id} className="rounded-2xl border bg-white p-3 space-y-2">
              <div className="text-sm text-gray-500">ID: {p.id}</div>
              <div className="font-semibold">{p.title}</div>
              <img src={current} alt={p.title} className="w-full aspect-square object-cover rounded-xl border"/>
              <input id={'img-'+p.id} className="border rounded-2xl px-3 py-2 w-full" placeholder="URL gambar baru atau /images/nama.jpg" defaultValue={ov.image || ''}/>
              <div className="flex items-center gap-2">
                <label className="text-sm px-3 py-2 rounded-2xl border cursor-pointer">
                  Upload File
                  <input type="file" accept="image/*" className="hidden" onChange={(e)=>onFileChange(p.id, e)} />
                </label>
                <button onClick={()=>onSaveUrl(p.id)} className="text-sm px-3 py-2 rounded-2xl bg-brand text-white">Simpan</button>
                {ov.image && <button onClick={()=>onReset(p.id)} className="text-sm px-3 py-2 rounded-2xl border">Reset</button>}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
