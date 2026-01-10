import SideNav from '@/components/SideNav'
import { SECTIONS } from '@/data/sections'
import { useActiveSection } from '@/hooks/useActiveSection'

import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Experience from '@/sections/Experience'
import Projects from '@/sections/Projects'

export default function App() {
  const sectionIds = SECTIONS.map((s) => s.id)
  const activeId = useActiveSection(sectionIds)

  return (
    <div className="min-h-dvh bg-bg text-text">
      <div className="mx-auto w-full max-w-6xl px-6 lg:flex lg:gap-16">
        <SideNav sections={SECTIONS} activeId={activeId} />

        <main className="pt-16 lg:w-[60%] lg:py-24">
          <section id="About" className="scroll-mt-24 pb-24">
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
