import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-xl text-sm hover:bg-gray-100 transition ${isActive ? 'font-semibold text-gray-900' : 'text-gray-600'}`
    }
  >
    {children}
  </NavLink>
)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const { count } = useCart()
  const { ids: wishlistIds } = useWishlist()

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="text-lg font-bold font-[heading]">Mini<span className="text-brand">Shop</span></Link>
        <button className="lg:hidden p-2 rounded-md border" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
        <nav className="hidden lg:flex items-center gap-1">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/products">Products</NavItem>
          <NavItem to="/users">Users</NavItem>
          <NavItem to="/wishlist">Wishlist</NavItem>
          {user && <NavItem to="/admin/products">Admin</NavItem>}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/wishlist" className="text-sm px-3 py-2 rounded-xl border">❤️ {wishlistIds.length}</Link>
          <Link to="/cart" className="px-3 py-2 rounded-xl bg-brand text-white text-sm">Cart ({count})</Link>
          {user ? (
            <>
              <span className="text-sm text-gray-600">Hi, {user.email}</span>
              <button onClick={logout} className="px-3 py-2 rounded-xl border text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm px-3 py-2 rounded-xl border">Login</Link>
              <Link to="/register" className="text-sm px-3 py-2 rounded-xl bg-brand text-white">Register</Link>
            </>
          )}
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t bg-white">
          <div className="container py-2 flex flex-col gap-2">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/products">Products</NavItem>
            <NavItem to="/users">Users</NavItem>
            <NavItem to="/wishlist">Wishlist</NavItem>
            {user && <NavItem to="/admin/products">Admin</NavItem>}
            <div className="flex items-center gap-2">
              <Link to="/wishlist" className="text-sm px-3 py-2 rounded-xl border">❤️ {wishlistIds.length}</Link>
              <Link to="/cart" className="px-3 py-2 rounded-xl bg-brand text-white text-sm">Cart ({count})</Link>
            </div>
            {user ? (
              <button onClick={logout} className="px-3 py-2 rounded-xl border text-sm w-fit">Logout</button>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="text-sm px-3 py-2 rounded-xl border">Login</Link>
                <Link to="/register" className="text-sm px-3 py-2 rounded-xl bg-brand text-white">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
