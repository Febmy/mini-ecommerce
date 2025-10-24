import React, { useMemo, useState } from 'react'

function normalize(src) {
  if (!src) return ''
  let s = String(src).trim()

  // strip quotes
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) s = s.slice(1, -1)

  // http -> https
  if (/^http:\/\//i.test(s)) s = s.replace(/^http:/i, 'https:')
  // protocol-relative -> https
  if (/^\/\//.test(s)) s = 'https:' + s

  // If not data/blob/http(s), treat as public path under /images
  if (!/^data:|^blob:|^https?:\/\//i.test(s)) {
    if (!s.startsWith('/')) s = '/images/' + s
  }
  return s
}

function cloudinarySrc(url, w){
  // insert transformation after /upload/
  return url.replace(/\/upload\/([^/]*)/, (m, t) => {
    const prefix = t ? t + ',' : ''
    return '/upload/' + prefix + `f_auto,q_auto,w_${w}`
  }).replace('/upload/', `/upload/f_auto,q_auto,w_${w}/`)
}

function imgixSrc(url, w){
  const hasQuery = url.includes('?')
  const qp = `auto=format&fit=max&w=${w}`
  return url + (hasQuery ? '&' + qp : '?' + qp)
}

function makeSrcSet(u){
  // Known CDNs
  if (/res\.cloudinary\.com\//.test(u)) {
    const s400 = cloudinarySrc(u, 400)
    const s800 = cloudinarySrc(u, 800)
    const s1200 = cloudinarySrc(u, 1200)
    return `${s400} 400w, ${s800} 800w, ${s1200} 1200w`
  }
  if (/imgix\.net\//.test(u) || /\/i\.imgix\.net\//.test(u)) {
    const s400 = imgixSrc(u, 400)
    const s800 = imgixSrc(u, 800)
    const s1200 = imgixSrc(u, 1200)
    return `${s400} 400w, ${s800} 800w, ${s1200} 1200w`
  }
  // Fallback: single URL, browser will scale; still provide sizes for layout
  return `${u} 800w`
}

export default function SmartImage({ src, alt, className, placeholder = '/images/placeholder.svg' }) {
  const [failed, setFailed] = useState(false)
  const url = useMemo(() => normalize(src), [src])
  const srcSet = useMemo(() => url ? makeSrcSet(url) : '', [url])
  const sizes = '(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw'

  if (failed || !url) {
    return <img src={placeholder} alt={alt || 'placeholder'} className={className} loading="lazy" />
  }

  // If data URL or blob, srcSet is not useful—use plain img
  if (/^data:|^blob:/i.test(url)) {
    return <img src={url} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />
  }

  return (
    <picture>
      <img
        src={url}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={className}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </picture>
  )
}
