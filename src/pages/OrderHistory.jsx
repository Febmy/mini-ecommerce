import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Riwayat Pesanan</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">Belum ada pesanan.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border rounded p-4 shadow hover:shadow-md transition"
            >
              <h2 className="font-semibold mb-2">
                Pesanan #{index + 1} - {order.date}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                Status: <span className="font-medium">{order.status}</span>
              </p>
              <ul className="list-disc list-inside mb-2">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} x {item.quantity} — Rp
                    {item.price.toLocaleString()}
                  </li>
                ))}
              </ul>
              <p className="font-bold">
                Total: Rp{order.total.toLocaleString()}
              </p>
              <Link
                to={`/orders/${index + 1}`}
                className="text-blue-600 hover:underline text-sm"
              >
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
