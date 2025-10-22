import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { totalQty } = useCart()
  const { isAuthenticated, email, logout } = useAuth()
  return (
    <header className="border-b bg-white">
      <nav className="container flex items-center justify-between py-4 gap-4">
        <Link to="/" className="text-xl font-bold text-sky-700">Mini Project</Link>
        <div className="flex items-center gap-3">
          <NavLink to="/products" className={({isActive}) => 'px-3 py-2 rounded hover:bg-gray-100 ' + (isActive ? 'text-sky-700 font-medium' : '')}>Products</NavLink>
          <NavLink to="/users" className={({isActive}) => 'px-3 py-2 rounded hover:bg-gray-100 ' + (isActive ? 'text-sky-700 font-medium' : '')}>Users</NavLink>
          <NavLink to="/cart" className={({isActive}) => 'px-3 py-2 rounded hover:bg-gray-100 ' + (isActive ? 'text-sky-700 font-medium' : '')}>
            Cart <span className="ml-1 inline-flex items-center justify-center text-xs rounded-full bg-sky-600 text-white w-5 h-5 align-middle">{totalQty}</span>
          </NavLink>
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className="px-3 py-2 rounded hover:bg-gray-100">Login</NavLink>
              <NavLink to="/register" className="px-3 py-2 rounded hover:bg-gray-100">Register</NavLink>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden sm:inline">Hi, {email}</span>
              <button className="btn btn-outline" onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
