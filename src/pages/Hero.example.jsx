import SafeImage from '../components/SafeImage.jsx';

export default function HeroExample() {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Koleksi Sepatu Terbaik
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600">
            Ringan, stylish, dan nyaman — siap menemani aktivitas harianmu.
          </p>
          <a
            href="/products"
            className="inline-flex items-center mt-6 rounded-xl bg-sky-600 px-5 py-3 text-white hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600"
          >
            Belanja sekarang
          </a>
        </div>
        <div className="justify-self-center">
          {/* TODO: ganti src ke hero utama milikmu dan sediakan versi 640/960/1280 (WebP/AVIF) */}
          <SafeImage
            src="/images/hero@1280.webp"
            srcSet="/images/hero@640.webp 640w, /images/hero@960.webp 960w, /images/hero@1280.webp 1280w"
            sizes="(max-width: 768px) 100vw, 640px"
            width="640"
            height="400"
            alt="Sneaker andalan untuk aktivitas harian"
            fetchpriority="high"   // bantu LCP
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
