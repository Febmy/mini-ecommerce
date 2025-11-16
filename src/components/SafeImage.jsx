/* SafeImage: image helper untuk poin Performance & CLS
 * - lazy load non-hero
 * - decoding async
 * - wajibkan width/height agar layout stabil
 */
export default function SafeImage({
  src,
  alt = "",
  width,
  height,
  loading = "lazy",
  decoding = "async",
  className = "",
  srcSet,
  sizes,
  fetchpriority, // gunakan 'high' hanya untuk LCP/hero
  ...rest
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      className={className}
      srcSet={srcSet}
      sizes={sizes}
      fetchpriority={fetchpriority}
      {...rest}
    />
  );
}
