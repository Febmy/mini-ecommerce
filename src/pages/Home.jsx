import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../utils/products";
import ProductCard from "../components/ProductCard.jsx";
import SimplePagination from "../components/SimplePagination.jsx";
import SafeImage from "../components/SafeImage.jsx"; // ⟵ penting

export default function Home() {
  const all = getAllProducts();
  const bestSellers = (all.filter((p) => p.featured) || all).slice(0, 4);

  // === New: pagination for Home products section ===
  const PER_PAGE = 8;
  const [page, setPage] = useState(1);
  const visible = all; // ganti jika ingin filter/search tertentu
  const totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const current = useMemo(
    () => visible.slice(start, start + PER_PAGE),
    [visible, start]
  );
  const UNSPLASH_BASE =
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&auto=format&fit=crop";

  const hero640 = `${UNSPLASH_BASE}&w=640`;
  const hero960 = `${UNSPLASH_BASE}&w=960`;
  const hero1280 = `${UNSPLASH_BASE}&w=1280`;

  return (
    <div className="space-y-16">
      {/* HERO (LCP) */}
      <section className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <p className="text-sm tracking-widest uppercase text-brand font-semibold">
            New Arrival
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight font-[heading]">
            Step Into Comfort —
            <span className="block text-gray-600">
              Minimal, ringan, siap dipakai harian.
            </span>
          </h1>
          <p className="text-gray-600 max-w-xl">
            Koleksi sepatu dan perlengkapan yang dirancang untuk aktivitasmu.
            Material premium, desain bersih, dan ergonomi yang mendukung
            performa.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="px-5 py-3 rounded-2xl bg-brand text-white"
            >
              Belanja sekarang
            </Link>
            <a
              href="#features"
              className="px-5 py-3 rounded-2xl border border-brand text-brand"
            >
              Lihat Fitur
            </a>
          </div>
          <div className="flex items-center gap-6 pt-2 text-sm text-gray-600">
            <div>✅ Garansi 30 hari</div>
            <div>🚚 Gratis ongkir*</div>
            <div>↩️ Mudah retur</div>
          </div>
        </div>

        <div className="relative">
          <SafeImage
            src={hero1280}
            srcSet={`${hero640} 640w, ${hero960} 960w, ${hero1280} 1280w`} // ← manual srcSet
            sizes="(max-width: 768px) 100vw, 640px"
            width={640}
            height={400}
            alt="Sneaker andalan untuk aktivitas harian"
            loading="eager"
            fetchpriority="high"
            className="w-full h-full object-cover rounded-3xl shadow-sm"
          />
          <div className="absolute -bottom-4 left-4 bg-white/90 backdrop-blur rounded-2xl px-4 py-2 text-sm shadow">
            ⭐ 4.9/5 dari 2.1k+ ulasan
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="border-y bg-white" aria-label="Brands">
        <div className="overflow-hidden">
          <div
            className="flex gap-12 py-6 whitespace-nowrap"
            style={{ animation: "scroll-marquee 25s linear infinite" }}
          >
            {[
              "Stride",
              "Volt",
              "Nimbus",
              "Aero",
              "Motion",
              "Pulse",
              "Core",
              "Prime",
            ].map((b, i) => (
              <span
                key={i}
                className="text-gray-500 text-sm tracking-widest uppercase"
              >
                {b}
              </span>
            ))}
            {[
              "Stride",
              "Volt",
              "Nimbus",
              "Aero",
              "Motion",
              "Pulse",
              "Core",
              "Prime",
            ].map((b, i) => (
              <span
                key={"d-" + i}
                className="text-gray-500 text-sm tracking-widest uppercase"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="container space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold">Kenapa memilih kami?</h2>
          <p className="text-gray-600">
            Material tepercaya, desain fungsional, dan pengalaman belanja yang
            mudah.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Ringan & Empuk",
              desc: "Midsole foam generasi baru untuk kenyamanan seharian.",
              icon: "👟",
            },
            {
              title: "Anti-Slip",
              desc: "Outsole bergrip tinggi, aman di permukaan licin.",
              icon: "🛡️",
            },
            {
              title: "Tahan Lama",
              desc: "Upper knit premium yang kuat & breathable.",
              icon: "⏳",
            },
            {
              title: "Garansi 30 Hari",
              desc: "Coba dulu — kalau tak cocok, tinggal retur.",
              icon: "✅",
            },
          ].map((f, idx) => (
            <div key={idx} className="rounded-2xl border bg-white p-5">
              <div className="text-2xl">{f.icon}</div>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="container space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Collections</h2>
          <Link to="/products" className="text-sm underline">
            Lihat semua
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: "Running Essentials",
              img: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1280&auto=format&fit=crop",
            },
            {
              title: "Urban Casual",
              img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1280&auto=format&fit=crop",
            },
            {
              title: "Outdoor & Trail",
              img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1280&auto=format&fit=crop",
            },
          ].map((c, i) => (
            <Link
              key={i}
              to="/products"
              className="group relative block rounded-3xl overflow-hidden border bg-white"
            >
              <SafeImage
                src={c.img}
                // sediakan beberapa lebar supaya data lebih hemat di mobile
                srcSet={`${c.img.replace(
                  "w=1280",
                  "w=640"
                )} 640w, ${c.img.replace("w=1280", "w=960")} 960w, ${
                  c.img
                } 1280w`}
                sizes="(max-width: 768px) 100vw, 33vw"
                width="1280"
                height="512"
                alt={c.title}
                className="w-full h-64 object-cover transition scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-semibold">
                {c.title}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="container space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Best Sellers</h2>
          <Link to="/products" className="text-sm underline">
            Lihat semua
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* BROWSE (PAGINATED) */}
      <section className="container space-y-6" id="products">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Browse Products</h2>
          <span className="text-sm text-gray-600">
            Total {visible.length} produk
          </span>
        </div>

        <ul
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          id="products-grid"
        >
          {current.map((p) => (
            <li key={p.id} className="rounded-2xl border bg-white p-4">
              <ProductCard product={p} />
            </li>
          ))}
        </ul>

        <SimplePagination
          className="mt-2"
          page={page}
          totalPages={totalPages}
          onChange={(p) => {
            setPage(p);
            const el = document.getElementById("products-grid");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      </section>

      {/* PROMO BANNER */}
      <section className="container">
        <div className="relative rounded-3xl overflow-hidden border bg-white">
          <SafeImage
            src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1600&auto=format&fit=crop"
            srcSet="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=640&auto=format&fit=crop 640w,
                    https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=960&auto=format&fit=crop 960w,
                    https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1600&auto=format&fit=crop 1600w"
            sizes="(max-width: 768px) 100vw, 100vw"
            width="1600"
            height="400"
            alt="Banner promosi koleksi musim ini"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white space-y-3">
              <h3 className="text-2xl sm:text-3xl font-bold">
                Diskon hingga 40% untuk koleksi musim ini
              </h3>
              <Link
                to="/products"
                className="inline-block px-5 py-3 rounded-2xl bg-brand text-white"
              >
                Belanja Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Apa kata mereka</h2>
          <ul className="space-y-3">
            {[
              {
                name: "Rizky",
                text: "Nyaman banget dipakai kerja dan jogging. Kualitasnya di atas ekspektasi.",
              },
              {
                name: "Salsa",
                text: "Pengiriman cepat, ukuran pas, dan enteng. Recommended!",
              },
              {
                name: "Dimas",
                text: "Desain simpel tapi keren. Value for money 👍",
              },
            ].map((t, i) => (
              <li key={i} className="p-4 rounded-2xl border bg-white">
                <p className="text-gray-800">“{t.text}”</p>
                <p className="text-sm text-gray-600 mt-1">— {t.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Dapatkan update & voucher</h2>
          <p className="text-gray-600">
            Berlangganan untuk info rilis terbaru, promo, dan tips perawatan
            sepatu.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <label htmlFor="email-sub" className="sr-only">
              Email
            </label>
            <input
              id="email-sub"
              name="email"
              className="flex-1 border rounded-2xl px-4 py-3"
              placeholder="Email kamu"
              type="email"
              autoComplete="email"
              required
            />
            <button className="px-5 py-3 rounded-2xl bg-brand text-white">
              Langganan
            </button>
          </form>
          <p className="text-xs text-gray-500">
            Dengan berlangganan, kamu menyetujui kebijakan privasi kami.
          </p>
        </div>
      </section>
    </div>
  );
}
