import React, { useState, useMemo } from 'react'

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
    <rect width='100%' height='100%' fill='#f3f4f6'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
          fill='#9ca3af' font-family='sans-serif' font-size='24'>
      Image unavailable
    </text>
  </svg>`)

export default function SafeImage({ src, alt = '', className = '', fallback = FALLBACK, ...rest }){
  const [err, setErr] = useState(false)
  const finalSrc = useMemo(() => (err ? fallback : src), [err, fallback, src])
  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setErr(true)}
      {...rest}
    />
  )
}
