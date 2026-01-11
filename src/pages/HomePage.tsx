import SideNav from '@/components/SideNav'
import PageShell from '@/components/PageShell'
import { SECTIONS } from '@/data/sections'
import { useActiveSection } from '@/hooks/useActiveSection'

import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Experience from '@/sections/Experience'
import Projects from '@/sections/Projects'
import { useLayoutEffect, useMemo } from 'react'

const STORAGE_KEY = 'scroll:home'

export default function HomePage() {
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), [])
  const { activeId, scrollTo } = useActiveSection(sectionIds)

  useLayoutEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (!saved) return

    const y = Number(saved)
    if (!Number.isFinite(y)) return

    // DOM 레이아웃이 잡힌 다음 프레임에 복원 (클램프 방지)
    requestAnimationFrame(() => {
      window.scrollTo({ top: y, left: 0, behavior: 'auto' })
    })
  }, [])

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-7xl px-6 lg:flex lg:gap-4">
        <SideNav
          sections={SECTIONS}
          activeId={activeId}
          onNavigate={scrollTo}
        />

        <main className="pt-24 lg:w-[52%] lg:py-24">
          <section id="about" className="scroll-mt-24 pb-24">
            <About />
          </section>

          <section id="skills" className="scroll-mt-24 pb-24">
            <Skills />
          </section>

          <section id="experience" className="scroll-mt-24 pb-24">
            <Experience />
          </section>

          <section id="projects" className="scroll-mt-24 pb-24">
            <Projects />
          </section>
        </main>
      </div>
    </PageShell>
  )
}
