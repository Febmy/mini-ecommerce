import { Routes, Route } from "react-router-dom";

// Import semua page
import Landing from "../pages/Landing";
import Catalog from "../pages/Catalog";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDetail from "../pages/UserDetail";
import Wishlist from "../pages/Wishlist";
import OrderHistory from "../pages/OrderHistory";
import OrderDetail from "../pages/OrderDetail";
import AdminOrderDetail from "../pages/AdminOrderDetail";
import NotFound from "../pages/NotFound";

// ProtectedRoute untuk halaman admin
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user/:id" element={<UserDetail />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/orders" element={<OrderHistory />} />
      <Route path="/orders/:id" element={<OrderDetail />} />

      {/* Admin Pages */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/orders/:id"
        element={
          <ProtectedRoute>
            <AdminOrderDetail />
          </ProtectedRoute>
        }
      />

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
