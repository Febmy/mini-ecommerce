import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="text-center space-y-3">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-gray-600">Halaman tidak ditemukan.</p>
      <Link to="/" className="px-4 py-2 rounded-2xl border">Kembali ke Home</Link>
    </div>
  )
}
