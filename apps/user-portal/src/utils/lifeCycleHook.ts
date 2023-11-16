import { useEffect, useRef } from 'react'

export const useMounted = (): Function => {
  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])
  return () => mountedRef.current
}
