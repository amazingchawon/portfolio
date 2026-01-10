import { useEffect } from 'react'

export function useMouseSpotlight(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const root = document.documentElement
    let raf = 0

    const onMove = (e: MouseEvent) => {
      // rAF로 묶어서 성능 안정화
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        root.style.setProperty('--mx', `${e.clientX}px`)
        root.style.setProperty('--my', `${e.clientY}px`)
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [enabled])
}
