import React, { createContext, useContext, useEffect, useState } from 'react'
import { loginReqres, registerReqres } from '../services/reqres.js'
const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  useEffect(() => { const s = localStorage.getItem('auth'); if (s) setUser(JSON.parse(s)) }, [])
  const save = (p) => { localStorage.setItem('auth', JSON.stringify(p)); setUser(p) }
  async function login(email, password) { const r = await loginReqres({ email, password }); save({ email, token: r.token }); return r }
  async function register(email, password) { const r = await registerReqres({ email, password }); save({ email, token: r.token }); return r }
  function logout() { localStorage.removeItem('auth'); setUser(null) }
  return <AuthCtx.Provider value={{ user, login, register, logout }}>{children}</AuthCtx.Provider>
}
