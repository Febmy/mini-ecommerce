# SafeImage usage
Ubah tag <img> ke <SafeImage> agar ada fallback offline saat images.unsplash.com gagal dimuat.

Contoh:
```jsx
// sebelum
<img src="https://images.unsplash.com/..." alt="..." className="w-full h-64 object-cover" />

// sesudah
import SafeImage from '../components/SafeImage.jsx'
<SafeImage src="https://images.unsplash.com/..." alt="..." className="w-full h-64 object-cover" />
```
