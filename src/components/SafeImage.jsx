import React, { useMemo, useState } from 'react'

function normalize(src) {
  if (!src) return ''
  let s = String(src).trim()

  // Strip surrounding quotes if any (defensive for CSV cases)
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1)
  }

  // http -> https
  if (/^http:\/\//i.test(s)) s = s.replace(/^http:/i, 'https:')
  // protocol-relative -> https
  if (/^\/\//.test(s)) s = 'https:' + s

  // If not data/blob/http(s), treat as path under /images (public)
  if (!/^data:|^blob:|^https?:\/\//i.test(s)) {
    if (s.startsWith('/')) return s
    s = '/images/' + s
  }
  return s
}

export default function SafeImage({ src, alt, className, placeholder = '/images/placeholder.svg' }) {
  const [failed, setFailed] = useState(false)
  const url = useMemo(() => normalize(src), [src])

  if (failed || !url) {
    return <img src={placeholder} alt={alt || 'placeholder'} className={className} loading="lazy" />
  }
  return <img src={url} alt={alt} className={className} onError={() => setFailed(true)} loading="lazy" />
}
