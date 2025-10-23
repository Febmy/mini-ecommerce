export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center gap-2 justify-between">
        <p>&copy; {new Date().getFullYear()} Mini Project React</p>
        <p>React • Vite • Tailwind 4.1 • Axios</p>
      </div>
    </footer>
  )
}
