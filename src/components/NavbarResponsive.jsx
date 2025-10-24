import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function NavbarResponsive() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-bold text-lg">MiniShop</Link>
        </div>

        {/* Desktop menu */}
        <ul className="hidden lg:flex items-center gap-6">
          <li><NavLink to="/" className="hover:underline">Home</NavLink></li>
          <li><NavLink to="/catalog" className="hover:underline">Catalog</NavLink></li>
          <li><NavLink to="/orders" className="hover:underline">Orders</NavLink></li>
          <li><NavLink to="/dashboard" className="hover:underline">Dashboard</NavLink></li>
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <NavLink to="/cart" className="px-3 py-1.5 rounded-xl border hover:bg-gray-50">Cart</NavLink>
          <NavLink to="/login" className="px-3 py-1.5 rounded-xl bg-black text-white">Login</NavLink>
        </div>

        {/* Burger */}
        <button
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t bg-white">
          <ul className="container mx-auto px-4 py-3 space-y-2">
            <li><NavLink to="/" onClick={() => setOpen(false)} className="block py-2">Home</NavLink></li>
            <li><NavLink to="/catalog" onClick={() => setOpen(false)} className="block py-2">Catalog</NavLink></li>
            <li><NavLink to="/orders" onClick={() => setOpen(false)} className="block py-2">Orders</NavLink></li>
            <li><NavLink to="/dashboard" onClick={() => setOpen(false)} className="block py-2">Dashboard</NavLink></li>
            <li className="pt-2 flex gap-2">
              <NavLink to="/cart" onClick={() => setOpen(false)} className="px-3 py-1.5 rounded-xl border">Cart</NavLink>
              <NavLink to="/login" onClick={() => setOpen(false)} className="px-3 py-1.5 rounded-xl bg-black text-white">Login</NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
