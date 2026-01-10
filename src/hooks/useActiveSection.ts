import { useEffect, useMemo, useState } from 'react'
import type { SectionId } from '@/data/sections'

type Options = {
  /**
   * 섹션이 화면에 "걸렸다"고 판단하는 기준.
   * - topMargin을 음수로 크게 잡으면, 화면 상단 쪽에 도달했을 때 활성화되기 쉬움
   * - bottomMargin을 음수로 잡으면, 너무 아래에서 활성화되는 걸 방지
   */
  topMargin?: string
  bottomMargin?: string
}

export function useActiveSection(sectionIds: SectionId[], options?: Options) {
  const [activeId, setActiveId] = useState<SectionId>(sectionIds[0] ?? 'intro')

  const rootMargin = useMemo(() => {
    const top = options?.topMargin ?? '-30%'
    const bottom = options?.bottomMargin ?? '-60%'
    // left/right는 0으로 둠
    return `${top} 0px ${bottom} 0px`
  }, [options?.topMargin, options?.bottomMargin])

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (els.length === 0) return

    // 화면에 들어온 섹션 중 "가장 최근에 들어온 것"을 active로 삼는 단순 전략
    const visible = new Set<string>()

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id
          if (e.isIntersecting) visible.add(id)
          else visible.delete(id)
        }

        // visible 중에서 DOM 순서 기준으로 마지막(가장 아래)을 active로
        const last = [...visible]
          .map((id) => document.getElementById(id))
          .filter(Boolean)
          .sort((a, b) => (a!.offsetTop ?? 0) - (b!.offsetTop ?? 0))
          .at(-1)?.id as SectionId | undefined

        if (last) setActiveId(last)
      },
      { root: null, rootMargin, threshold: 0.1 },
    )

    for (const el of els) io.observe(el)
    return () => io.disconnect()
  }, [sectionIds, rootMargin])

  return activeId
}
