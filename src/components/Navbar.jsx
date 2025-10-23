import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { totalQty } = useCart();
  const { isAuthenticated, email, logout } = useAuth();
  const linkClass = ({ isActive }) =>
    "navlink " + (isActive ? "navlink-active" : "");

  return (
    <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <nav className="container flex items-center justify-between py-4 gap-4">
        <Link to="/" className="text-xl sm:text-2xl font-bold text-sky-700">
          Mini Shop
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <NavLink to="/products" className={linkClass}>
            Produk
          </NavLink>
          <NavLink to="/users" className={linkClass}>
            Users
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            Keranjang
            <span className="ml-2 inline-flex items-center justify-center text-[10px] font-semibold rounded-full bg-sky-600 text-white w-5 h-5 align-middle">
              {totalQty}
            </span>
          </NavLink>
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className={linkClass}>
                Masuk
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                Daftar
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-gray-600">
                Hai, {email}
              </span>
              <button className="btn btn-outline" onClick={logout}>
                Keluar
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
