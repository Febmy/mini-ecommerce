import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>

      {user ? (
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="mb-2">✅ Kamu sudah login!</p>
          <p>
            <strong>Token:</strong> {user.token}
          </p>
        </div>
      ) : (
        <p className="text-red-600">Kamu belum login.</p>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Menu Admin</h2>
        <ul className="list-disc list-inside">
          <li>Kelola Produk</li>
          <li>Kelola Pesanan</li>
          <li>Laporan Penjualan</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
