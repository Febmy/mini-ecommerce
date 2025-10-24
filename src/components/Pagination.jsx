import React from 'react'

export default function Pagination({ page, total, perPage, onChange }){
  const pages = Math.ceil((total || 0) / (perPage || 1))
  if (!pages || pages <= 1) return null
  const items = Array.from({ length: pages }, (_, i) => i + 1)
  return (
    <nav className="mt-6 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      {items.map(p => (
        <button
          key={p}
          aria-current={p===page ? 'page' : undefined}
          onClick={() => onChange?.(p)}
          className={`px-3 py-1.5 rounded-xl border text-sm transition
            ${p===page ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
        >
          {p}
        </button>
      ))}
    </nav>
  )
}
