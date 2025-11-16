// src/App.jsx
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SkipToContent from "./components/SkipToContent.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

// LAZY pages (hapus semua import halaman non-lazy)
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Users = lazy(() => import("./pages/Users.jsx"));
const UserDetail = lazy(() => import("./pages/UserDetail.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const PayOrder = lazy(() => import("./pages/PayOrder.jsx"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess.jsx"));
const Wishlist = lazy(() => import("./pages/Wishlist.jsx"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts.jsx"));
const FixBaseImages = lazy(() => import("./pages/admin/FixBaseImages.jsx"));
const MergeOverrides = lazy(() => import("./pages/admin/MergeOverrides.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-dvh flex flex-col">
            <SkipToContent />
            <Navbar />

            <Suspense fallback={<div className="p-6">Loading…</div>}>
              <main id="content" className="flex-1 container py-6">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />

                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/pay/:orderId" element={<PayOrder />} />
                  <Route path="/order-success" element={<OrderSuccess />} />

                  <Route path="/wishlist" element={<Wishlist />} />

                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute>
                        <Users />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/users/:id"
                    element={
                      <ProtectedRoute>
                        <UserDetail />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/admin/products"
                    element={
                      <ProtectedRoute>
                        <AdminProducts />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/fix-images"
                    element={
                      <ProtectedRoute>
                        <FixBaseImages />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/merge-overrides"
                    element={
                      <ProtectedRoute>
                        <MergeOverrides />
                      </ProtectedRoute>
                    }
                  />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </Suspense>

            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
