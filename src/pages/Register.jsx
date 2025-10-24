import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
export default function Register(){
  const { register } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('eve.holt@reqres.in')
  const [password, setPassword] = useState('pistol')
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)
  async function onSubmit(e){ e.preventDefault(); setErr(null); setLoading(true); try{ await register(email,password); nav('/', { replace:true }) } catch(e){ setErr(e?.response?.data?.error || 'Register gagal') } finally { setLoading(false) } }
  return (<div className="max-w-md mx-auto"><h2 className="text-2xl font-bold mb-4">Register</h2><form onSubmit={onSubmit} className="space-y-3"><input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder="Email" className="w-full border rounded-2xl px-3 py-2"/><input value={password} onChange={e=>setPassword(e.target.value)} type="password" required placeholder="Password" className="w-full border rounded-2xl px-3 py-2"/>{err && <p className="text-sm text-red-600">{err}</p>}<button disabled={loading} className="w-full px-4 py-2 rounded-2xl bg-brand text-white">{loading ? 'Loading...' : 'Daftar'}</button></form><p className="text-sm text-gray-600 mt-3">Sudah punya akun? <Link to="/login" className="underline">Login</Link></p></div>)}
