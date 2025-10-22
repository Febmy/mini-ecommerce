import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loginReqres, registerReqres } from '../services/reqres.js'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [email, setEmail] = useState(() => localStorage.getItem('email') || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    localStorage.setItem('token', token || '')
    localStorage.setItem('email', email || '')
  }, [token, email])

  const isAuthenticated = !!token

  const login = async (payload) => {
    setLoading(true); setError('')
    try {
      const { data } = await loginReqres(payload)
      setToken(data?.token || '')
      setEmail(payload.email || '')
      return { ok: true }
    } catch (e) {
      setError(e?.response?.data?.error || 'Login gagal')
      setToken('')
      return { ok: false, error: e?.response?.data?.error }
    } finally {
      setLoading(false)
    }
  }

  const register = async (payload) => {
    setLoading(true); setError('')
    try {
      const { data } = await registerReqres(payload)
      setToken(data?.token || '')
      setEmail(payload.email || '')
      return { ok: true }
    } catch (e) {
      setError(e?.response?.data?.error || 'Register gagal')
      setToken('')
      return { ok: false, error: e?.response?.data?.error }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken(''); setEmail('')
  }

  const value = useMemo(() => ({
    token, email, isAuthenticated, loading, error, login, register, logout
  }), [token, email, isAuthenticated, loading, error])

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
