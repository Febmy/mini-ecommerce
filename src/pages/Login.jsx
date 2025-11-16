import React, { useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const errorRef = useRef(null);

  async function onSubmit(e) {
    e.preventDefault();
    setErr(null);

    const emailVal = email.trim();
    const pwdVal = password.trim();
    if (!emailVal || !pwdVal) {
      setErr("Email dan password wajib diisi");
      (!emailVal ? emailRef : passwordRef).current?.focus();
      return;
    }

    setLoading(true);
    try {
      await login(emailVal, pwdVal);
      nav(loc.state?.from?.pathname || "/", { replace: true });
    } catch (e) {
      setErr(e?.response?.data?.error || e?.message || "Login gagal");
      errorRef.current?.focus();
    } finally {
      setLoading(false);
    }
  }

  const emailId = "login-email";
  const passId = "login-password";
  const helpId = "login-help";
  const errId = "login-error";

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Masuk</h1>

      <form
        onSubmit={onSubmit}
        aria-describedby={helpId}
        aria-busy={loading || undefined}
        noValidate
        className="space-y-3"
      >
        <div>
          <label htmlFor={emailId} className="block mb-1">
            Email
          </label>
          <input
            id={emailId}
            name="email"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            autoComplete="email"
            autoCapitalize="none"
            spellCheck="false"
            placeholder="nama@contoh.com"
            className="w-full border rounded-2xl px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor={passId} className="block mb-1">
            Password
          </label>
          <input
            id={passId}
            name="password"
            ref={passwordRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            autoComplete="current-password"
            className="w-full border rounded-2xl px-3 py-2"
          />
        </div>

        <p id={helpId} className="text-xs text-gray-500">
          Demo akun: <code>eve.holt@reqres.in</code> / <code>cityslicka</code>
        </p>

        {err && (
          <p
            id={errId}
            ref={errorRef}
            role="alert"
            aria-live="assertive"
            tabIndex={-1}
            className="text-sm text-red-600"
          >
            {err}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 rounded-2xl bg-brand text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand"
        >
          {loading ? "Memproses…" : "Masuk"}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-3">
        Belum punya akun?{" "}
        <Link to="/register" className="underline">
          Daftar
        </Link>
      </p>
    </div>
  );
}
