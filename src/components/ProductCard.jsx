import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext.jsx";
import SmartImage from "./SmartImage.jsx";

export default function ProductCard({ product }) {
  const { has, toggle } = useWishlist();
  const wished = has(product.id);

  return (
    <div className="rounded-2xl border bg-white overflow-hidden flex flex-col relative">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggle(product.id);
        }}
        aria-label={wished ? "Hapus dari wishlist" : "Tambahkan ke wishlist"}
        aria-pressed={wished}
        title={wished ? "Hapus dari wishlist" : "Tambah ke wishlist"}
        className={`absolute top-2 right-2 rounded-full bg-white/90 backdrop-blur px-2 py-1 text-lg shadow ${
          wished ? "text-red-600" : "text-gray-700"
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500`}
      >
        {wished ? "❤️" : "🤍"}
      </button>

      {/* Gambar: width/height eksplisit + lazy + decoding=async => CLS & Performance */}
      <SmartImage
        src={product.image}
        alt={product.title}
        width={320}
        height={320}
        className="aspect-square w-full object-cover"
        loading="lazy"
        decoding="async"
        // sizes & srcSet otomatis kalau sumber dari Unsplash, bisa override kalau perlu
      />

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold line-clamp-2">{product.title}</h3>
        <p className="mt-1 text-sm text-gray-600">{product.category}</p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-base font-bold">
            Rp{Number(product.price || 0).toLocaleString("id-ID")}
          </span>

          <Link
            to={`/products/${product.id}`}
            aria-label={`Detail produk ${product.title}`}
            className="text-sm px-3 py-1.5 rounded-xl border focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
