const LS_CUSTOM = 'custom_coupons_v1'

const defaultCoupons = [
  // 10% off, no min, max Rp100k
  { code: 'SALE10', label: 'Diskon 10%', percent: 10, maxDiscount: 100000, minSubtotal: 0, expires: '2099-12-31' },
  // Rp20k off, min Rp150k
  { code: 'HEMAT20K', label: 'Potongan Rp20.000', amount: 20000, minSubtotal: 150000, expires: '2099-12-31' },
  // Free shipping
  { code: 'FREESHIP', label: 'Gratis Ongkir', freeShipping: true, minSubtotal: 50000, expires: '2099-12-31' },
]

function getCustomCoupons(){
  try { return JSON.parse(localStorage.getItem(LS_CUSTOM) || '[]') } catch { return [] }
}
export function saveCustomCoupons(list){
  localStorage.setItem(LS_CUSTOM, JSON.stringify(list || []))
}

export function listCoupons(){
  return [...defaultCoupons, ...getCustomCoupons()]
}

export function findCoupon(raw){
  if (!raw) return null
  const code = String(raw).trim().toUpperCase()
  return listCoupons().find(c => c.code.toUpperCase() === code) || null
}

export function evaluateCoupon(coupon, subtotal){
  if (!coupon) return { valid:false, reason:'Kupon tidak ditemukan' }
  const today = new Date()
  if (coupon.expires && new Date(coupon.expires) < today) return { valid:false, reason:'Kupon sudah kadaluarsa' }
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) return { valid:false, reason:`Minimal belanja Rp${coupon.minSubtotal.toLocaleString('id-ID')}` }

  let discount = 0
  if (coupon.percent) {
    discount = Math.round(subtotal * (coupon.percent/100))
    if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount)
  }
  if (coupon.amount) discount += coupon.amount
  // cap discount not exceed subtotal
  discount = Math.min(discount, subtotal)
  const freeShipping = !!coupon.freeShipping
  return { valid:true, discount, freeShipping, label: coupon.label || coupon.code, code: coupon.code }
}
