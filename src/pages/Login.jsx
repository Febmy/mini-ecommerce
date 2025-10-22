import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login, loading, error, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('eve.holt@reqres.in')
  const [password, setPassword] = useState('cityslicka')
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/users'

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
  }, [isAuthenticated, navigate, from])

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await login({ email, password })
    if (res.ok) navigate(from, { replace: true })
  }

  return (
    <section className="max-w-md mx-auto bg-white border rounded-xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full rounded border px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="eve.holt@reqres.in" />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" className="w-full rounded border px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="cityslicka" />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="btn btn-primary w-full">{loading ? 'Memproses...' : 'Masuk'}</button>
      </form>
      <p className="text-sm text-gray-600">Coba skenario gagal: kosongkan password → akan mengembalikan error (LOGIN - UNSUCCESSFUL).</p>
    </section>
  )
}
