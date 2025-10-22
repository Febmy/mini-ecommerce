import AppRoutes from "./routes";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Navbar />
          <AppRoutes />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
