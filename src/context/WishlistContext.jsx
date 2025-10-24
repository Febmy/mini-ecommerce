import React, { createContext, useContext, useEffect, useState } from 'react'
const Ctx = createContext(null)
const KEY = 'wishlist_v1'

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([])
  useEffect(() => {
    try { setIds(JSON.parse(localStorage.getItem(KEY) || '[]')) } catch {}
  }, [])
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(ids))
  }, [ids])

  const toggle = (id) => setIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const has = (id) => ids.includes(id)
  const clear = () => setIds([])

  return <Ctx.Provider value={{ ids, toggle, has, clear }}>{children}</Ctx.Provider>
}
export const useWishlist = () => useContext(Ctx)
