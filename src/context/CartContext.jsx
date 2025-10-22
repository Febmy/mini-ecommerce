import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
const CartCtx = createContext(null)
export function CartProvider({ children }) {
  const [stored, setStored] = useLocalStorage('cart', [])
  const [items, setItems] = useState(stored)
  useEffect(() => { setStored(items) }, [items, setStored])
  const totalQty = useMemo(() => items.reduce((a, i) => a + i.qty, 0), [items])
  const totalPrice = useMemo(() => items.reduce((a, i) => a + i.price * i.qty, 0), [items])
  const add = (product, qty = 1) => {
    setItems(prev => {
      const exist = prev.find(p => p.id === product.id)
      if (exist) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p)
      return [...prev, { ...product, qty }]
    })
  }
  const remove = (id) => setItems(prev => prev.filter(p => p.id !== id))
  const setQty = (id, qty) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p))
  const clear = () => setItems([])
  const value = { items, add, remove, setQty, clear, totalQty, totalPrice }
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}
export const useCart = () => {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
