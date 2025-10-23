import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login, loading, error, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka"); // credential sukses
  const navigate = useNavigate();
  const from = useLocation().state?.from?.pathname || "/users";

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  const onSubmit = async (e) => {
    e.preventDefault(); // ⬅️ penting: cegah browser submit GET
    const res = await login({ email, password });
    if (res.ok) navigate(from, { replace: true });
  };

  return (
    <section className="max-w-md mx-auto bg-white border rounded-2xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        {" "}
        {/* ⬅️ form */}
        <div>
          <label className="block text-sm mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email" // ⬅️ fix warning autocomplete
            className="w-full rounded-lg border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="eve.holt@reqres.in"
          />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password" // ⬅️ fix warning autocomplete
            className="w-full rounded-lg border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="cityslicka"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </section>
  );
}
