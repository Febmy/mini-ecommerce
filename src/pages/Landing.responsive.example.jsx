import React from 'react'
import Container from '../components/Container.jsx'
import SafeImage from '../components/SafeImage.jsx'

export default function LandingResponsiveExample(){
  return (
    <div className="bg-gray-50">
      <Container className="py-10 lg:py-16">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Temukan Sepatu Favoritmu</h1>
            <p className="text-gray-600 max-w-xl mx-auto lg:mx-0">Diskon spesial, koleksi baru tiap minggu.</p>
            <div className="flex gap-3 justify-center lg:justify-start">
              <a href="/catalog" className="px-5 py-3 rounded-2xl bg-black text-white">Belanja Sekarang</a>
              <a href="#best" className="px-5 py-3 rounded-2xl border">Best Sellers</a>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <SafeImage src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop" alt="Hero" className="w-full max-w-md lg:max-w-lg mx-auto rounded-3xl"/>
          </div>
        </div>

        <section id="best" className="mt-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Best Sellers</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_,i)=>(
              <li key={i} className="rounded-2xl border bg-white p-4 hover:shadow-sm transition">
                <div className="aspect-square overflow-hidden rounded-xl mb-3">
                  <SafeImage src={`https://picsum.photos/seed/${i}/600/600`} alt={`item ${i}`} className="w-full h-full object-cover" />
                </div>
                <div className="font-medium">Produk #{i+1}</div>
                <div className="text-sm text-gray-600">Rp 499.000</div>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  )
}
