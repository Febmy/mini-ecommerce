import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container-std py-6">
          <Outlet />
        </div>
      </main>
      <footer className="border-t">
        <div className="container-std py-6 text-sm text-neutral-500">
          © {new Date().getFullYear()} MiniProject
        </div>
      </footer>
    </div>
  )
}
