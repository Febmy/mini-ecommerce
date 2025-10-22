import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const readValue = () => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  }
  const [storedValue, setStoredValue] = useState(readValue)
  useEffect(() => {
    const handler = () => setStoredValue(readValue())
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [key])
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch {}
  }, [key, storedValue])
  return [storedValue, setValue]
}
