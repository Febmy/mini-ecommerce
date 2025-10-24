import React, { useEffect, useMemo, useState } from "react";
import ProductGridWithPagination from "../components/ProductGridWithPagination.jsx";

// Dummy products for example; replace with your real products array or filteredProducts
const PRODUCTS = Array.from({ length: 37 }).map((_, i) => ({
  id: i + 1,
  name: `Produk ${i + 1}`,
  price: 250000 + (i % 7) * 25000,
  image: `https://picsum.photos/seed/home-${i}/600/600`,
}));

export default function HomePaginationExample() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("latest");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = !q ? PRODUCTS : PRODUCTS.filter(p => p.name.toLowerCase().includes(q));
    if (sort === "price-asc") arr = [...arr].sort((a,b)=>a.price-b.price);
    if (sort === "price-desc") arr = [...arr].sort((a,b)=>b.price-a.price);
    return arr;
  }, [query, sort]);

  return (
    <section className="container mx-auto px-4 py-8" id="products">
      {/* Controls */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <input
          className="w-full sm:max-w-sm border rounded-2xl px-3 py-2"
          placeholder="Cari produk…"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
        <select
          className="w-full sm:w-48 border rounded-2xl px-3 py-2"
          value={sort}
          onChange={(e)=>setSort(e.target.value)}
        >
          <option value="latest">Terbaru</option>
          <option value="price-asc">Harga termurah</option>
          <option value="price-desc">Harga termahal</option>
        </select>
      </div>

      {/* Grid + Pagination */}
      <ProductGridWithPagination
        items={visible}
        perPage={8}
        resetDeps={[query, sort]}
        scrollToId="products-grid"
      />
    </section>
  );
}
