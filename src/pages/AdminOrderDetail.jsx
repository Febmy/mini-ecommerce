import { useParams, Link } from "react-router-dom";
import useOrders from "../hooks/useOrders";

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [orders, setOrders] = useOrders();
  const order = orders.find((o) => o.id.toString() === id);

  if (!order) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Pesanan tidak ditemukan</h1>
        <Link to="/dashboard" className="text-blue-600 underline">
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  const updateStatus = (newStatus) => {
    const updated = orders.map((o) =>
      o.id.toString() === id ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Detail Pesanan (Admin)</h1>
      <p>
        <strong>Customer:</strong> {order.customer}
      </p>
      <p>
        <strong>Alamat:</strong> {order.address}
      </p>
      <p>
        <strong>Metode Pembayaran:</strong> {order.payment}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p className="mb-4">
        <strong>Total:</strong> Rp{order.total.toLocaleString()}
      </p>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Update Status:</label>
        <select
          value={order.status}
          onChange={(e) => updateStatus(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Diproses">Diproses</option>
          <option value="Selesai">Selesai</option>
          <option value="Dibatalkan">Dibatalkan</option>
        </select>
      </div>

      <h2 className="text-xl font-semibold mb-2">Produk</h2>
      <div className="space-y-4">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-2"
          >
            <div className="flex items-center gap-4">
              <img
                src={`/assets/images/${item.image}`}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="text-blue-600 font-bold">
              Rp{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link
          to="/dashboard"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
