import SideNav from '@/components/SideNav'
import { SECTIONS } from '@/data/sections'
import { useActiveSection } from '@/hooks/useActiveSection'

import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Experience from '@/sections/Experience'
import Projects from '@/sections/Projects'
import { useEffect, useMemo } from 'react'

export default function App() {
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), [])
  const { activeId, scrollTo } = useActiveSection(sectionIds)

  // 커서 좌표를 CSS 변수로 업데이트
  useEffect(() => {
    const root = document.documentElement
    let raf = 0

    const onMove = (e: MouseEvent) => {
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
  }, [])

  return (
    <div className="relative min-h-dvh bg-bg text-text">
      {/* spotlight overlay (클릭/스크롤 방해 X) */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: `
              radial-gradient(
                700px circle
                at var(--mx, 50%) var(--my, 50%),
                var(--spotlight-color),
                transparent 60%
              )
            `,
        }}
      />

      {/* 실제 콘텐츠는 overlay 위로 */}
      <div className="relative z-20">
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
      </div>
    </div>
  )
}
