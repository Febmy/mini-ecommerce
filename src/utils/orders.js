const LS_ORDERS = 'orders_v1'

export function getOrders(){
  try { return JSON.parse(localStorage.getItem(LS_ORDERS) || '[]') } catch { return [] }
}
export function getOrderById(id){
  return getOrders().find(o => o.id === id) || null
}
export function saveOrder(order){
  const all = getOrders()
  all.push(order)
  localStorage.setItem(LS_ORDERS, JSON.stringify(all))
}
export function updateOrder(id, patch){
  const all = getOrders()
  const idx = all.findIndex(o => o.id === id)
  if (idx === -1) return false
  all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() }
  localStorage.setItem(LS_ORDERS, JSON.stringify(all))
  return true
}
export function newOrderId(){
  const dt = new Date()
  const y = dt.getFullYear()
  const m = String(dt.getMonth()+1).padStart(2,'0')
  const d = String(dt.getDate()).padStart(2,'0')
  const t = String(dt.getHours()).padStart(2,'0') + String(dt.getMinutes()).padStart(2,'0') + String(dt.getSeconds()).padStart(2,'0')
  const rnd = Math.random().toString(36).slice(2,7).toUpperCase()
  return `INV-${y}${m}${d}-${t}-${rnd}`
}
