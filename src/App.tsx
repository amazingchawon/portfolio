import { useEffect, useState } from 'react'

type SectionId = 'intro' | 'skills' | 'experience' | 'projects'

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'intro', label: '소개' },
  { id: 'skills', label: '기술' },
  { id: 'experience', label: '경험' },
  { id: 'projects', label: '프로젝트' },
]

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [activeId, setActiveId] = useState<SectionId>('intro')

  // 초기 상태: 현재 html에 dark가 붙어있는지 확인
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggleDarkMode() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  // 현재 섹션 하이라이트 (정석 IntersectionObserver)
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    for (const s of SECTIONS) {
      const el = document.getElementById(s.id)
      if (!el) continue

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(s.id)
        },
        { threshold: 0.35 },
      )

      obs.observe(el)
      observers.push(obs)
    }

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="min-h-screen bg-bg text-text font-sans">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text">
              Portfolio System Check
            </h1>
            <p className="mt-2 text-sm text-muted">
              fonts / colors / dark mode / anchor nav 테스트
            </p>
          </div>

          <button
            type="button"
            onClick={toggleDarkMode}
            className={cx(
              'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold',
              'border border-border bg-bg text-text',
              'transition hover:bg-gray-100 active:translate-y-[1px]',
              'focus:outline-none focus:ring-2 focus:ring-primary',
            )}
          >
            <span
              className={cx(
                'h-2.5 w-2.5 rounded-full',
                isDark ? 'bg-pink-100' : 'bg-primary',
              )}
            />
            Theme: {isDark ? 'Dark' : 'Light'}
          </button>
        </header>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr]">
          {/* Side Nav */}
          <aside className="md:pr-2">
            <nav className="sticky top-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                목차
              </p>

              <ul className="mt-3 space-y-1">
                {SECTIONS.map((s) => {
                  const isActive = s.id === activeId
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={cx(
                          'block rounded-lg px-3 py-2 text-sm transition',
                          'hover:bg-surface-accent',
                          isActive
                            ? 'bg-gray-100 text-text font-semibold'
                            : 'text-muted',
                        )}
                      >
                        {s.label}
                      </a>
                    </li>
                  )
                })}
              </ul>

              {/* Quick check card */}
              <div className="mt-6 rounded-2xl border border-border bg-bg p-4">
                <p className="text-xs font-semibold text-muted">Quick check</p>

                <div className="mt-3 space-y-2 text-sm">
                  <p className="text-text">text-text</p>
                  <p className="text-muted">text-muted</p>
                  <p className="text-primary">text-primary</p>

                  <div className="rounded-xl bg-surface-accent p-3">
                    <p className="text-text">bg-surface-accent</p>
                    <p className="mt-1 text-xs text-muted">
                      다크모드에서 토큰이 바뀌면 여기 배경도 바뀜
                    </p>
                  </div>

                  <div className="rounded-xl border border-border p-3 font-mono text-xs">
                    Inconsolata: const a = 1;
                  </div>
                </div>
              </div>
            </nav>
          </aside>

          {/* Sections */}
          <main className="min-w-0 space-y-16">
            <Section id="intro" title="소개">
              <p className="leading-7 text-text">
                이 페이지는 토큰/매핑이 제대로 먹는지 확인하는 용도야.{' '}
                <span className="text-primary">primary</span> 텍스트와{' '}
                <span className="bg-surface-accent px-1.5 py-0.5">
                  surface-accent
                </span>{' '}
                배경이 기대대로 보이면 성공.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card title="Palette (gray)">
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-900">gray-900</p>
                    <p className="text-gray-600">gray-600</p>
                    <div className="rounded-lg border border-gray-200 bg-gray-100 p-3">
                      <p className="text-sm text-text">
                        border gray-200 + bg gray-100
                      </p>
                    </div>
                  </div>
                </Card>

                <Card title="Accents">
                  <div className="space-y-3 text-sm">
                    <p className="text-red-500">red-500</p>
                    <div className="rounded-lg bg-pink-100 p-3">
                      <p className="text-text">pink-100 background</p>
                      <p className="mt-1 text-xs text-muted">
                        강조 영역 배경으로 적합
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90">
                        Primary button
                      </button>
                      <button className="rounded-lg border border-border bg-bg px-3 py-2 text-sm font-semibold text-text transition hover:bg-gray-100">
                        Ghost button
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            </Section>

            <Section id="skills" title="기술">
              <p className="text-muted">
                태그(반복 요소) 스타일 예시. hover도 확인해.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Tailwind', 'Vite', 'Mapbox'].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-bg px-3 py-1 text-sm text-text transition hover:bg-surface-accent"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </Section>

            <Section id="experience" title="경험">
              <div className="space-y-4">
                <TimelineItem
                  title="회사/팀 이름"
                  period="2025.01 — 2025.12"
                  desc="이런 성격의 일을 했고, 이런 임팩트를 만들었습니다."
                />
                <TimelineItem
                  title="프로젝트/활동"
                  period="2024.06 — 2024.12"
                  desc="이런 문제를 해결했고, 이런 기술을 사용했습니다."
                />
              </div>
            </Section>

            <Section id="projects" title="프로젝트">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ProjectCard
                  title="불이야"
                  tag="Android / Map"
                  desc="비상 상황 시각화 + 대피 안내"
                />
                <ProjectCard
                  title="볼로그"
                  tag="Watch / Data Viz"
                  desc="경기 흐름을 히트맵/캘린더로"
                />
              </div>
            </Section>

            <footer className="border-t border-border pt-8 text-sm text-muted">
              여기까지 색/폰트/다크모드가 의도대로면, 이제 실제 콘텐츠 개발로
              넘어가면 돼.
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id: SectionId
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-semibold tracking-tight text-text">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function Card({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border bg-bg p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function TimelineItem({
  title,
  period,
  desc,
}: {
  title: string
  period: string
  desc: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-bg p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-semibold text-text">{title}</p>
        <p className="font-mono text-xs text-muted">{period}</p>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">{desc}</p>
    </div>
  )
}

function ProjectCard({
  title,
  tag,
  desc,
}: {
  title: string
  tag: string
  desc: string
}) {
  return (
    <div className="group rounded-2xl border border-border bg-bg p-5 transition hover:bg-surface-accent">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-text">{title}</p>
          <p className="mt-1 text-xs text-muted">{tag}</p>
        </div>
        <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">
          View
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{desc}</p>
      <p className="mt-4 text-xs text-primary underline-offset-4 group-hover:underline">
        자세히 보기
      </p>
    </div>
  )
}
