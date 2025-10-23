import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register, loading, error, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("pistol"); // credential sukses
  const navigate = useNavigate();

  useEffect(() => { if (isAuthenticated) navigate("/users", { replace: true }); }, [isAuthenticated, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();                    // ⬅️ cegah submit GET
    const res = await register({ email, password });
    if (res.ok) navigate("/users", { replace: true });
  };

  return (
    <section className="max-w-md mx-auto bg-white border rounded-2xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Register</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-lg border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="eve.holt@reqres.in"
          />
        </div>

        <div>
          <label className="block text-sm mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"    // ⬅️ fix warning autocomplete
            className="w-full rounded-lg border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="pistol"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "Memproses..." : "Daftar"}
        </button>
      </form>
      <p className="text-xs text-gray-500">Kosongkan password untuk melihat skenario gagal.</p>
    </section>
  );
}
