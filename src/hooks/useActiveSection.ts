import { useEffect, useMemo, useRef, useState } from 'react'
import type { SectionId } from '@/data/sections'

type Options = {
  /**
   * 섹션이 화면에 "걸렸다"고 판단하는 기준.
   * - topMargin을 음수로 크게 잡으면, 화면 상단 쪽에 도달했을 때 활성화되기 쉬움
   * - bottomMargin을 음수로 잡으면, 너무 아래에서 활성화되는 걸 방지
   */
  topMargin?: string
  bottomMargin?: string
  offsetPx?: number
  lockMs?: number
}

export function useActiveSection(sectionIds: SectionId[], options?: Options) {
  const [activeId, setActiveId] = useState<SectionId>(
    (sectionIds[0] ?? 'about') as SectionId,
  )

  const offsetPx = options?.offsetPx ?? 16
  const lockMs = options?.lockMs ?? 700

  const rootMargin = useMemo(() => {
    const top = options?.topMargin ?? '-20%'
    const bottom = options?.bottomMargin ?? '-40%'
    return `${top} 0px ${bottom} 0px`
  }, [options?.topMargin, options?.bottomMargin])

  const lockRef = useRef(false)
  const lockTimerRef = useRef<number | null>(null)
  const lock = () => {
    lockRef.current = true
    if (lockTimerRef.current) window.clearTimeout(lockTimerRef.current)
    lockTimerRef.current = window.setTimeout(() => {
      lockRef.current = false
    }, lockMs)
  }

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (els.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return

        const best = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0]

        if (best?.target?.id) setActiveId(best.target.id as SectionId)
      },
      {
        root: null,
        rootMargin,
        threshold: [0.2, 0.35, 0.5, 0.65],
      },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sectionIds, rootMargin])

  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id)
    if (!el) return

    setActiveId(id)
    lock()

    const y = el.getBoundingClientRect().top + window.scrollY - offsetPx
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return { activeId, scrollTo }
}
