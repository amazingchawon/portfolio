// src/components/SideNav.tsx
import type { Section, SectionId } from '@/data/sections'
import NavMark from '@/assets/icons/NavMark'
import ExternalLinkIcon from '@/assets/icons/ExternalLinkIcon'

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  sections: Section[]
  activeId: SectionId
  onNavigate: (id: SectionId) => void
}

export default function SideNav({ sections, activeId, onNavigate }: Props) {
  return (
    <aside className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24 md:pt-16 md:pb-8">
      {/* top */}
      <div>
        <header className="space-y-3">
          <h1 className="text-5xl font-bold text-text">Nahyun Kim</h1>
          <p className="text-xl font-medium text-text">Front End Developer</p>
          <p className="max-w-[36ch] text-muted">
            보기 좋은 화면을 넘어,
            <br />
            매끄러운 사용자 경험을 만듭니다.
          </p>
        </header>

        <nav className="mt-14">
          <ul className="space-y-4">
            {sections.map((s) => {
              const isActive = s.id === activeId

              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    data-active={isActive ? 'true' : 'false'}
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate(s.id)
                    }}
                    className={cx(
                      'group inline-flex items-center gap-3 text-sm transition-colors',
                      isActive ? 'text-primary' : 'text-muted hover:text-text',
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <NavMark className="h-4 w-4" />

                    <span className="navtext flex items-center gap-3">
                      <span>{s.label.ko}</span>
                      <span>{s.label.en}</span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* bottom */}
      <div className="mt-16 flex flex-col gap-4 font-mono text-sm text-muted lg:mt-0">
        <a
          className="group inline-flex items-center gap-1 text-sm text-muted hover:text-text"
          href="https://github.com/amazingchawon"
          target="_blank"
          rel="noreferrer"
        >
          github
          <ExternalLinkIcon className="h-4 w-4 translate-y-px transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
        <a
          className="group inline-flex items-center gap-1 text-sm text-muted hover:text-text"
          href="mailto:irene.k2547@gmail.com"
        >
          email
          <ExternalLinkIcon className="h-4 w-4 translate-y-px transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </aside>
  )
}
