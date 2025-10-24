import React, { useEffect, useMemo, useRef, useState } from "react";
import SimplePagination from "./SimplePagination.jsx";

/**
 * Drop-in pagination grid for Home product section.
 *
 * Props:
 * - items: Array<{ id?: string|number, name?: string, price?: number, image?: string }>
 * - perPage?: number (default 8)
 * - resetDeps?: any[]  -> when any value changes, page resets to 1 (e.g., [query, selectedCategories, sort])
 * - renderItem?: (item) => ReactNode -> optional custom renderer for a card
 * - gridClassName?: string -> override grid classes
 * - onPageChange?: (p:number) => void
 * - scrollToId?: string -> element id to scroll into view on page change (default 'products-grid')
 */
export default function ProductGridWithPagination({
  items = [],
  perPage = 8,
  resetDeps = [],
  renderItem,
  gridClassName = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6",
  onPageChange,
  scrollToId = "products-grid",
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil((items?.length || 0) / perPage));
  const start = (page - 1) * perPage;

  useEffect(() => {
    setPage(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...resetDeps]);

  useEffect(() => {
    if (!scrollToId) return;
    const el = document.getElementById(scrollToId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page, scrollToId]);

  const current = useMemo(() => {
    const src = Array.isArray(items) ? items : [];
    return src.slice(start, start + perPage);
  }, [items, start, perPage]);

  const onChange = (p) => {
    setPage(p);
    onPageChange?.(p);
  };

  return (
    <div>
      <ul id={scrollToId} className={gridClassName}>
        {current.map((item, idx) => (
          <li key={item?.id ?? idx} className="rounded-2xl border bg-white p-4 hover:shadow-sm transition">
            {renderItem ? (
              renderItem(item)
            ) : (
              <DefaultCard item={item} />
            )}
          </li>
        ))}
        {current.length === 0 && (
          <li className="col-span-full rounded-2xl border bg-white p-6 text-center text-gray-600">
            Tidak ada produk yang cocok.
          </li>
        )}
      </ul>

      <SimplePagination
        className="mt-6"
        page={page}
        totalPages={totalPages}
        onChange={onChange}
      />
    </div>
  );
}

function DefaultCard({ item }) {
  const { image, name, price } = item || {};
  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-xl mb-3 bg-gray-50">
        <img
          src={image}
          alt={name || "Produk"}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => (e.currentTarget.style.opacity = 0.35)}
        />
      </div>
      <div className="font-medium truncate">{name || "Produk"}</div>
      {typeof price !== "undefined" && (
        <div className="text-sm text-gray-600">Rp {Number(price).toLocaleString("id-ID")}</div>
      )}
    </div>
  );
}
