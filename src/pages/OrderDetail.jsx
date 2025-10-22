import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const selectedOrder = savedOrders[parseInt(id) - 1];
    setOrder(selectedOrder);
  }, [id]);

  if (!order) {
    return (
      <div className="p-6">
        <p>Pesanan tidak ditemukan.</p>
        <Link to="/orders" className="text-blue-600 hover:underline">
          Kembali ke Riwayat
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detail Pesanan #{id}</h1>
      <p className="mb-2">Tanggal: {order.date}</p>
      <p className="mb-2">Status: {order.status}</p>
      <ul className="list-disc list-inside mb-4">
        {order.items.map((item, i) => (
          <li key={i}>
            {item.name} x {item.quantity} — Rp{item.price.toLocaleString()}
          </li>
        ))}
      </ul>
      <p className="font-bold mb-4">Total: Rp{order.total.toLocaleString()}</p>
      <Link to="/orders" className="text-blue-600 hover:underline">
        ⬅ Kembali ke Riwayat
      </Link>
    </div>
  );
};

export default OrderDetail;
