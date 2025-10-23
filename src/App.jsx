import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Users from './pages/Users.jsx'
import UserDetail from './pages/UserDetail.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 container py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserDetail />} />
              </Route>

              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="*" element={<Navigate to="/404" replace />} />
              <Route path="/404" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
