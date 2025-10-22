import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Reqres API untuk register
      const res = await axios.post("https://reqres.in/api/register", form);
      console.log(res.data); // { id: 4, token: "QpwL5tke4Pnpja7X4" }
      setSuccess("Registrasi berhasil! Silakan login.");
      setError("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err.response?.data);
      setError("Registrasi gagal, gunakan email & password yang valid");
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded w-80"
      >
        <h1 className="text-xl font-bold mb-4">Register</h1>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

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
          autoComplete="new-password"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
