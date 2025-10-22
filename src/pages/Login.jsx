import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://reqres.in/api/login", form);
      login(res.data.token); // simpan token ke context/localStorage
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data);
      setError("Login gagal, gunakan email & password yang valid");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded w-80"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 mb-3 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          autoComplete="username"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 mb-3 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
