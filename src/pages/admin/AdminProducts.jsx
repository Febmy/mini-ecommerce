import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getCustomProducts, saveCustomProducts, nextId } from '../../utils/products'
import ProductCard from '../../components/ProductCard.jsx'
import { Link } from 'react-router-dom'

function parseCSV(text) {
  const rows = []
  let i = 0, field = '', row = [], inQuotes = false
  while (i < text.length) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i+1] === '"') { field += '"'; i += 2; continue }
        inQuotes = false; i++; continue
      } else { field += c; i++; continue }
    } else {
      if (c === '"') { inQuotes = true; i++; continue }
      if (c === ',') { row.push(field); field=''; i++; continue }
      if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i+1] === '\n') i++
        row.push(field); rows.push(row); field=''; row=[]; i++; continue
      }
      field += c; i++
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row) }
  return rows
}

function toCSV(rows) {
  function esc(v='') {
    const s = String(v ?? '')
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g,'""')}` + '"'
    return s
  }
  return rows.map(r => r.map(esc).join(',')).join('\n')
}

export default function AdminProducts() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ id: null, title: '', price: '', category: '', image: '', featured: false })
  const [q, setQ] = useState('')
  const fileRef = useRef(null)

  useEffect(() => setItems(getCustomProducts()), [])

  function resetForm() {
    setForm({ id: null, title: '', price: '', category: '', image: '', featured: false })
    const file = document.getElementById('fileUpload'); if (file) file.value = ''
  }

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm(f => ({ ...f, image: reader.result }))
    reader.readAsDataURL(file)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errors = []
    if (!form.title.trim()) errors.push('Judul wajib diisi')
    if (!String(form.price).trim() || isNaN(Number(form.price))) errors.push('Harga harus angka')
    if (!form.category.trim()) errors.push('Kategori wajib diisi')
    if (!form.image.trim()) errors.push('Gambar wajib diisi (URL atau upload)')
    if (errors.length) { alert(errors.join('\n')); return }

    let list = [...items]
    if (form.id == null) {
      const newItem = { id: nextId(), title: form.title.trim(), price: Number(form.price), category: form.category.trim(), image: form.image.trim(), featured: !!form.featured }
      list.push(newItem)
    } else {
      list = list.map(it => it.id === form.id ? { ...it, title: form.title.trim(), price: Number(form.price), category: form.category.trim(), image: form.image.trim(), featured: !!form.featured } : it)
    }
    setItems(list); saveCustomProducts(list); resetForm()
  }

  function onEdit(it) {
    setForm({ id: it.id, title: it.title, price: it.price, category: it.category, image: it.image, featured: !!it.featured })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function onDelete(id) {
    if (!confirm('Hapus produk ini?')) return
    const list = items.filter(it => it.id !== id)
    setItems(list); saveCustomProducts(list)
    if (form.id === id) resetForm()
  }

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return items
    return items.filter(p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query))
  }, [items, q])

  function exportCSV() {
    const header = ['title','price','category','image','featured']
    const rows = items.map(p => [p.title, p.price, p.category, p.image, p.featured ? 1 : 0])
    const csv = toCSV([header, ...rows])
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'custom-products.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  function importCSV(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result || '')
      const rows = parseCSV(text).filter(r => r.length && r.some(x => String(x).trim().length))
      if (!rows.length) { alert('CSV kosong'); return }
      const [header, ...data] = rows
      const idx = { title: -1, price: -1, category: -1, image: -1, featured: -1 }
      header.forEach((h, i) => {
        const key = String(h).trim().toLowerCase()
        if (key in idx) idx[key] = i
      })
      if (idx.title===-1 || idx.price===-1 || idx.category===-1 || idx.image===-1) {
        alert('Header wajib: title, price, category, image[, featured]')
        return
      }
      let list = [...items]
      for (const r of data) {
        const title = (r[idx.title]||'').trim()
        const price = Number((r[idx.price]||'').toString().trim())
        const category = (r[idx.category]||'').trim()
        const image = (r[idx.image]||'').trim()
        const featured = idx.featured !== -1 ? String(r[idx.featured]||'0').trim() : '0'
        if (!title || !category || !image || isNaN(price)) continue
        list.push({ id: nextId(), title, price, category, image, featured: featured==='1' || /^true$/i.test(featured) })
      }
      setItems(list); saveCustomProducts(list)
      if (fileRef.current) fileRef.current.value = ''
      alert('Import selesai')
    }
    reader.readAsText(file)
  }

  function downloadTemplate() {
    const csv = 'title,price,category,image,featured\n"Product Name",199000,"Shoes","https://domain.com/img.jpg",0'
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'template-products.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl font-bold">Admin Produk</h1>
        <div className="flex flex-wrap gap-2">
          <Link to="/products" className="px-3 py-2 rounded-2xl border text-sm">Lihat Katalog</Link>
          <Link to="/admin/fix-images" className="px-3 py-2 rounded-2xl border text-sm">Perbaiki Gambar Bawaan</Link>
          <Link to="/admin/merge-overrides" className="hidden px-3 py-2 rounded-2xl border text-sm">Merge Overrides → JSON</Link>
          <button onClick={exportCSV} className="hidden px-3 py-2 rounded-2xl border text-sm">Export CSV</button>
          <button onClick={downloadTemplate} className="hidden px-3 py-2 rounded-2xl border text-sm">Download Template</button>
          <label className="hidden px-3 py-2 rounded-2xl border text-sm cursor-pointer">
            Import CSV
            <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={importCSV} className="hidden" />
          </label>
        </div>
      </header>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="rounded-2xl border bg-white p-4 space-y-3">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <input className="border rounded-2xl px-3 py-2" placeholder="Judul produk" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <input className="border rounded-2xl px-3 py-2" placeholder="Harga (number)" inputMode="numeric" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
          <input className="border rounded-2xl px-3 py-2" placeholder="Kategori" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
          <input className="border rounded-2xl px-3 py-2 sm:col-span-2 lg:col-span-2" placeholder="URL Gambar (https://...) atau /images/xxx.jpg" value={form.image.startsWith('data:') ? '' : form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
          <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1">
            <input id="fileUpload" type="file" accept="image/*" onChange={handleFile} className="text-sm" />
            <span className="text-xs text-gray-500">atau isi URL di kolom sebelah</span>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
            Tampilkan di Best Sellers (featured)
          </label>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-2xl bg-brand text-white">{form.id == null ? 'Tambah' : 'Simpan Perubahan'}</button>
          {form.id != null && <button type="button" className="px-4 py-2 rounded-2xl border" onClick={resetForm}>Batal</button>}
        </div>
        {form.image ? <div className="pt-2 text-sm text-gray-600">Preview:</div> : null}
        {form.image ? <img src={form.image} alt="preview" className="w-40 h-40 object-cover rounded-xl border" /> : null}
      </form>

      {/* LIST */}
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-lg font-semibold">Produk yang kamu tambahkan</h2>
        <input className="border rounded-2xl px-3 py-2" placeholder="Cari di produk custom..." value={q} onChange={e => setQ(e.target.value)} />
      </div>

      {filtered.length ? (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <li key={p.id} className="rounded-2xl border bg-white p-3 space-y-3">
              <ProductCard product={p} />
              <div className="flex items-center justify-between">
                <button onClick={() => onEdit(p)} className="px-3 py-1.5 rounded-xl border text-sm">Edit</button>
                <button onClick={() => onDelete(p.id)} className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-sm">Hapus</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-6 border rounded-2xl bg-white text-center text-gray-600">Belum ada produk custom.</div>
      )}
    </div>
  )
}
