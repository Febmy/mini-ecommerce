import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-blue-600 text-white">
      {/* Logo / Brand */}
      <Link to="/" className="text-xl font-bold">
        MiniShop
      </Link>

      {/* Menu */}
      <div className="flex gap-4">
        <Link to="/catalog">Catalog</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/orders">Orders</Link>
        {user && <Link to="/dashboard">Dashboard</Link>}
      </div>

      {/* Auth Buttons */}
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
