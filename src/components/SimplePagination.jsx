import React from "react";

export default function SimplePagination({ page, totalPages, onChange, className = "" }) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 6;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <nav className={`flex flex-wrap items-center justify-center gap-2 ${className}`} aria-label="Pagination">
      <button
        className="px-3 py-1.5 rounded-xl border text-sm disabled:opacity-50"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
      >
        Prev
      </button>
      {start > 1 && <button className="px-3 py-1.5 rounded-xl border text-sm" onClick={() => onChange(1)}>1</button>}
      {start > 2 && <span className="px-1 text-sm text-gray-500">…</span>}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`px-3 py-1.5 rounded-xl border text-sm transition ${p === page ? "bg-black text-white" : "bg-white hover:bg-gray-50"}`}
        >
          {p}
        </button>
      ))}
      {end < totalPages - 1 && <span className="px-1 text-sm text-gray-500">…</span>}
      {end < totalPages && <button className="px-3 py-1.5 rounded-xl border text-sm" onClick={() => onChange(totalPages)}>{totalPages}</button>}
      <button
        className="px-3 py-1.5 rounded-xl border text-sm disabled:opacity-50"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </nav>
  );
}
