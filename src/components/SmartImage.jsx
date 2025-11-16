// SmartImage.jsx
// Gambar aman: width/height (anti-CLS), lazy, decoding async, fallback placeholder.
// Otomatis bikin srcSet untuk Unsplash agar hemat data di mobile.

import { useState, useMemo } from "react";

const PLACEHOLDER = "/images/placeholder.webp"; // sediakan file kecil di /public/images/

function buildUnsplashSrcSet(src, baseWidth = 640) {
  if (!src || !src.includes("images.unsplash.com")) return null;
  const mk = (w) =>
    src.replace(/(\?|$)/, (m) => (m === "?" ? `?w=${w}&` : `?w=${w}`));
  return `${mk(baseWidth)} ${baseWidth}w, ${mk(960)} 960w, ${mk(
    1280
  )} 1280w, ${mk(1600)} 1600w`;
}

export default function SmartImage({
  src,
  alt = "",
  width = 640,
  height = 640,
  className = "",
  loading = "lazy",
  decoding = "async",
  sizes = "(max-width: 768px) 100vw, 25vw",
  srcSet, // bisa override jika mau
  ...rest
}) {
  const [err, setErr] = useState(false);

  const autoSrcSet = useMemo(() => {
    if (srcSet) return srcSet;
    return buildUnsplashSrcSet(src, width) || undefined;
  }, [src, srcSet, width]);

  return (
    <img
      src={err ? PLACEHOLDER : src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      className={className}
      sizes={autoSrcSet ? sizes : undefined}
      srcSet={autoSrcSet}
      onError={() => setErr(true)}
      {...rest}
    />
  );
}
