import base from '../assets/products.json'

const LS_CUSTOM = 'custom_products_v1'
const LS_OVERRIDES = 'product_overrides_v1' // { [id]: { image?: string, title?, price?, category?, featured? } }

// --- Custom products (admin-created) ---
export function getCustomProducts() {
  try { return JSON.parse(localStorage.getItem(LS_CUSTOM) || '[]') } catch { return [] }
}
export function saveCustomProducts(list) {
  localStorage.setItem(LS_CUSTOM, JSON.stringify(list))
}

// --- Overrides for base products ---
export function getOverrides() {
  try { return JSON.parse(localStorage.getItem(LS_OVERRIDES) || '{}') } catch { return {} }
}
export function saveOverride(id, fields) {
  const ov = getOverrides()
  ov[id] = { ...(ov[id] || {}), ...fields }
  localStorage.setItem(LS_OVERRIDES, JSON.stringify(ov))
}
export function clearOverride(id) {
  const ov = getOverrides()
  delete ov[id]
  localStorage.setItem(LS_OVERRIDES, JSON.stringify(ov))
}
export function clearAllOverrides() {
  localStorage.setItem(LS_OVERRIDES, '{}')
}

export function getBaseProducts() { return base }

export function mergeBaseWithOverrides() {
  const ov = getOverrides()
  return base.map(p => ov[p.id] ? { ...p, ...ov[p.id] } : p)
}

export function getAllProducts() {
  const merged = mergeBaseWithOverrides()
  return [...merged, ...getCustomProducts()]
}

export function nextId() {
  const maxBase = base.reduce((m, p) => Math.max(m, p.id), 0)
  const maxCustom = getCustomProducts().reduce((m, p) => Math.max(m, p.id || 0), 0)
  return Math.max(maxBase, maxCustom) + 1
}
