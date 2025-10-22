import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import useOrders from "../hooks/useOrders";
import Toast from "../components/Toast";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [orders, setOrders] = useOrders();
  const [form, setForm] = useState({ name: "", address: "", payment: "COD" });
  const [toast, setToast] = useState(null);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!form.name || !form.address) {
      setToast({ message: "Nama dan alamat wajib diisi!", type: "error" });
      return;
    }

    if (cartItems.length === 0) {
      setToast({
        message: "Keranjang kosong, tidak bisa checkout!",
        type: "error",
      });
      return;
    }

    const newOrder = {
      id: Date.now(),
      customer: form.name,
      address: form.address,
      payment: form.payment,
      items: cartItems,
      total: totalPrice,
      status: "Pending",
    };

    setOrders([...orders, newOrder]);
    clearCart();
    setForm({ name: "", address: "", payment: "COD" });
    setToast({ message: "Pesanan berhasil dibuat!", type: "success" });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama Lengkap"
          className="w-full border px-4 py-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Alamat Lengkap"
          className="w-full border px-4 py-2 rounded"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />
        <select
          className="w-full border px-4 py-2 rounded"
          value={form.payment}
          onChange={(e) => setForm({ ...form, payment: e.target.value })}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Transfer">Transfer Bank</option>
          <option value="E-Wallet">E-Wallet</option>
        </select>

        <h2 className="text-lg font-semibold">
          Total: Rp{totalPrice.toLocaleString()}
        </h2>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Buat Pesanan
        </button>
      </form>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Checkout;
