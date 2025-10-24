import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Users from './pages/Users.jsx'
import UserDetail from './pages/UserDetail.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import PayOrder from './pages/PayOrder.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import NotFound from './pages/NotFound.jsx'
import Wishlist from './pages/Wishlist.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminProducts from './pages/admin/AdminProducts.jsx'
import FixBaseImages from './pages/admin/FixBaseImages.jsx'
import MergeOverrides from './pages/admin/MergeOverrides.jsx'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-dvh flex flex-col">
            <Navbar />
            <main className="flex-1 container py-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
                <Route path="/admin/fix-images" element={<ProtectedRoute><FixBaseImages /></ProtectedRoute>} />
                <Route path="/admin/merge-overrides" element={<ProtectedRoute><MergeOverrides /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pay/:orderId" element={<PayOrder />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                <Route path="/users/:id" element={<ProtectedRoute><UserDetail /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}
