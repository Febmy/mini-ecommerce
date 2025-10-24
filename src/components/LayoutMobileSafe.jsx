import React from 'react'

/**
 * Wrap your app with this to get correct mobile (iOS Safari/Chrome) height,
 * and safe-area paddings for notch/home bar.
 *
 * Usage:
 *   <LayoutMobileSafe navbar={<Navbar/>} footer={<Footer/>}>
 *     <YourRoutes />
 *   </LayoutMobileSafe>
 */
export default function LayoutMobileSafe({ navbar = null, footer = null, children }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-gray-50 safe-top safe-bottom">
      {navbar && (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b safe-gutter">
          {navbar}
        </header>
      )}
      <main className="flex-1">{children}</main>
      {footer && (
        <footer className="mt-8 safe-gutter">
          <div className="container mx-auto px-4 py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} MiniShop
          </div>
        </footer>
      )}
    </div>
  )
}
