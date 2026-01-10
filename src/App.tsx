import SideNav from '@/components/SideNav'
import { SECTIONS } from '@/data/sections'
import { useActiveSection } from '@/hooks/useActiveSection'

import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Experience from '@/sections/Experience'
import Projects from '@/sections/Projects'
import { useMemo } from 'react'

export default function App() {
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), [])
  const { activeId, scrollTo } = useActiveSection(sectionIds)

  return (
    <div className="min-h-dvh bg-bg text-text">
      <div className="mx-auto w-full max-w-6xl px-6 lg:flex lg:gap-4">
        <SideNav
          sections={SECTIONS}
          activeId={activeId}
          onNavigate={scrollTo}
        />

        <main className="pt-16 lg:w-[52%] lg:py-24">
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
  )
}
