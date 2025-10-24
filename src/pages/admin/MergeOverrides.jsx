import React, { useMemo } from 'react'
import base from '../../assets/products.json'
import { getOverrides, mergeBaseWithOverrides, clearAllOverrides } from '../../utils/products'
import { Link } from 'react-router-dom'

export default function MergeOverrides(){
  const overrides = getOverrides()
  const impacted = useMemo(() => base.filter(p => overrides[p.id]), [overrides])
  const merged = useMemo(() => mergeBaseWithOverrides(), [overrides])

  function downloadMerged(){
    const blob = new Blob([JSON.stringify(merged, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'products.json' // replace assets/products.json with this
    a.click()
    URL.revokeObjectURL(url)
  }

  function copyToClipboard(){
    navigator.clipboard.writeText(JSON.stringify(merged, null, 2)).then(() => alert('JSON tersalin ke clipboard'))
  }

  function clearAll(){
    if (!confirm('Hapus semua override lokal?')) return
    clearAllOverrides()
    alert('Semua override dihapus. Refresh halaman ini.')
    location.reload()
  }

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Merge Overrides → products.json</h1>
        <div className="flex gap-2">
          <Link to="/admin/products" className="px-3 py-2 rounded-2xl border text-sm">Kembali ke Admin Produk</Link>
        </div>
      </header>

      <div className="rounded-2xl border bg-white p-4 space-y-3">
        <p className="text-gray-700">
          Halaman ini akan <b>menggabungkan perubahan lokal</b> (mis. gambar diperbaiki di <code>/admin/fix-images</code>)
          ke dalam file <code>assets/products.json</code> agar <b>permanen</b> di repo.
        </p>
        <ol className="list-decimal ml-5 space-y-1 text-gray-700 text-sm">
          <li>Klik <b>Download merged products.json</b> untuk mengunduh file hasil gabungan.</li>
          <li>Ganti file <code>src/assets/products.json</code> di project kamu dengan file yang terunduh.</li>
          <li>Commit & push (kalau pakai Git).</li>
        </ol>

        <div className="flex flex-wrap gap-2 pt-1">
          <button onClick={downloadMerged} className="px-3 py-2 rounded-2xl bg-brand text-white text-sm">Download merged products.json</button>
          <button onClick={copyToClipboard} className="px-3 py-2 rounded-2xl border text-sm">Copy JSON</button>
          <button onClick={clearAll} className="px-3 py-2 rounded-2xl border text-sm">Hapus semua override lokal</button>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-4">
        <h2 className="font-semibold mb-2">Produk yang terkena override ({impacted.length})</h2>
        {impacted.length ? (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {impacted.map(p => {
              const ov = overrides[p.id] || {}
              return (
                <li key={p.id} className="rounded-2xl border p-3 space-y-2">
                  <div className="text-sm text-gray-500">ID: {p.id}</div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-gray-500">Sebelum</div>
                      <img src={p.image} alt="" className="w-full aspect-square object-cover rounded-xl border"/>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Sesudah</div>
                      <img src={ov.image || p.image} alt="" className="w-full aspect-square object-cover rounded-xl border"/>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="text-gray-600">Belum ada override. Silakan perbaiki gambar dulu di halaman <code>/admin/fix-images</code>.</p>
        )}
      </div>
    </section>
  )
}
