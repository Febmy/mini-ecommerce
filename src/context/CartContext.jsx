import React, { createContext, useContext, useMemo, useState } from 'react'
const CartCtx = createContext(null)
export const useCart = () => useContext(CartCtx)
export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const add = (product, qty=1) => setItems(prev => {
    const i = prev.find(p => p.id === product.id)
    return i ? prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p) : [...prev, { id: product.id, title: product.title, price: product.price, qty }]
  })
  const remove = (id) => setItems(prev => prev.filter(p => p.id != id))
  const clear = () => setItems([])
  const count = useMemo(() => items.reduce((a,b)=>a+b.qty,0), [items])
  const total = useMemo(() => items.reduce((a,b)=>a+b.qty*b.price,0), [items])
  return <CartCtx.Provider value={{ items, add, remove, clear, count, total }}>{children}</CartCtx.Provider>
}
