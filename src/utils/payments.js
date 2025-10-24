const defaultPayments = [
  { code: 'COD', label: 'COD (Bayar di Tempat)', type: 'cod' },
  { code: 'BCA', label: 'Transfer Bank BCA', type: 'bank', bankName: 'BCA', accountName: 'PT MiniShop', accountNumber: '1234567890', note: 'Dicek manual 5–10 menit' },
  { code: 'DANA', label: 'E-Wallet DANA', type: 'ewallet', accountName: 'MiniShop', accountNumber: '0812-3456-7890', note: 'Pastikan nama penerima benar' },
  { code: 'VA', label: 'Virtual Account (Dummy)', type: 'va', bankName: 'BCA', vaNumber: '98881234567890', note: 'Hanya untuk simulasi' },
]

export function listPayments(){ return defaultPayments }
export function getPayment(code){
  return defaultPayments.find(p => p.code === code) || defaultPayments[0]
}
