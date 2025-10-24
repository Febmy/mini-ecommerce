import React from 'react'
export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} MiniShop — Built with React, Vite & Tailwind
      </div>
    </footer>
  )
}
