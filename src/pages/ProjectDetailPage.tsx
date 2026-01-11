import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import PageShell from '@/components/PageShell'
import { getProjectBySlug } from '@/lib/projectContent'

import ArrowBackIcon from '@/assets/icons/ArrowBackIcon'
import ExternalLinkIcon from '@/assets/icons/ExternalLinkIcon'

import { useEffect } from 'react'

type MdImage = { alt: string; src: string }

function extractImagesFromMarkdown(md: string) {
  const images: MdImage[] = []
  const lines = md.split('\n')

  // 이미지 라인만 빼고, 나머지는 텍스트로 남긴다
  const restLines: string[] = []

  const imgRegex = /^!\[([^\]]*)\]\(([^)]+)\)\s*$/

  for (const line of lines) {
    const m = line.trim().match(imgRegex)
    if (m) {
      images.push({ alt: m[1] ?? '', src: m[2] ?? '' })
    } else {
      restLines.push(line)
    }
  }

  return { images, rest: restLines.join('\n').trim() }
}

export default function ProjectDetailPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  const { slug } = useParams<{ slug: string }>()
  const safeSlug = slug ?? ''

  const data = safeSlug ? getProjectBySlug(safeSlug) : null

  if (!data) {
    return (
      <PageShell>
        <main className="mx-auto w-full max-w-3xl px-6 py-16">
          <Link className="text-muted hover:text-text" to="/">
            ← 홈으로
          </Link>

          <h1 className="mt-6 text-3xl font-bold text-text">
            프로젝트를 찾을 수 없어요
          </h1>
          <p className="mt-3 text-muted">
            경로가 잘못됐거나 아직 작성되지 않은 프로젝트입니다.
          </p>
        </main>
      </PageShell>
    )
  }

  const { frontmatter, sections } = data
  const title = frontmatter.title ?? safeSlug
  const tech = frontmatter.tech ?? []

  return (
    <PageShell>
      <main className="mx-auto w-full min-h-dvh max-w-7xl px-6 lg:flex lg:gap-10">
        {/* LEFT (sticky) */}
        <aside className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24 md:pt-16 md:pb-8">
          <div>
            <Link
              className="text-muted hover:text-primary font-medium flex flex-row gap-2 group items-center"
              to="/"
            >
              <ArrowBackIcon className="h-4 w-4 translate-x-px transition-transform duration-200 ease-out group-hover:-translate-x-1 group-hover:text-primary" />
              Nahyun Kim
            </Link>

            <h1 className="mt-4 text-5xl font-bold text-text">{title}</h1>

            {/* Meta */}
            <dl className="mt-10 space-y-3 text-sm">
              {frontmatter.period ? (
                <div className="flex gap-1">
                  <dt className="w-16 shrink-0 text-muted">기간</dt>
                  <dd className="pl-4 text-text">{frontmatter.period}</dd>
                </div>
              ) : null}

              {frontmatter.role ? (
                <div className="flex gap-1">
                  <dt className="w-16 shrink-0 text-muted">역할</dt>
                  <dd className="pl-4 text-text">{frontmatter.role}</dd>
                </div>
              ) : null}

              {frontmatter.team ? (
                <div className="flex gap-1">
                  <dt className="w-16 shrink-0 text-muted">팀</dt>
                  <dd className="pl-4 text-text">{frontmatter.team}</dd>
                </div>
              ) : null}

              {/* Tech */}
              {tech.length ? (
                <div className="flex gap-1">
                  <dt className="w-16 shrink-0 text-muted">기술 스택</dt>
                  <dd className="pl-3 text-text">{tech.join(', ')}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="mt-16 flex flex-row gap-1 group text-muted  items-center">
            {frontmatter.github ? (
              <a
                className="inline-flex w-fit items-center gap-2 text-sm group-hover:text-text font-mono"
                href={frontmatter.github}
                target="_blank"
                rel="noreferrer"
              >
                github repository
              </a>
            ) : null}
            <ExternalLinkIcon className="h-4 w-4 translate-y-px transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-text" />
          </div>
        </aside>

        {/* RIGHT (markdown sections) */}
        <article className="lg:w-[52%] lg:py-24">
          <div className="space-y-12">
            {sections.map((section) => {
              const isGallery = section.title === 'Key Screens' // 원하는 제목으로 통일
              const { images, rest } = isGallery
                ? extractImagesFromMarkdown(section.content)
                : { images: [], rest: section.content }

              return (
                <section key={section.title} className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-text">
                    {section.title}
                  </h2>

                  <div className="mt-4 space-y-4">
                    {/* 가로 스크롤 갤러리 */}
                    {isGallery && images.length > 0 ? (
                      <div className="flex gap-3 scrollbar-custom overflow-x-auto pb-2 pr-1 snap-x snap-mandatory [-webkit-overflow-scrolling:touch]">
                        {images.map((img) => {
                          const src = img.src.startsWith('/')
                            ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${img.src}`
                            : img.src

                          return (
                            <figure
                              key={img.src}
                              className="shrink-0 snap-start"
                            >
                              <img
                                src={src}
                                alt={img.alt}
                                loading="lazy"
                                className="h-80 w-auto max-w-none rounded-sm "
                              />
                            </figure>
                          )
                        })}
                      </div>
                    ) : null}

                    {/* 섹션 안에 남은 텍스트는 그대로 마크다운 렌더 */}
                    {rest ? (
                      <ReactMarkdown
                        components={{
                          p: ({ ...props }) => (
                            <p className="text-muted leading-7" {...props} />
                          ),
                          ul: ({ ...props }) => (
                            <ul
                              className="list-disc pl-5 text-muted"
                              {...props}
                            />
                          ),
                          ol: ({ ...props }) => (
                            <ol
                              className="list-decimal pl-5 text-muted"
                              {...props}
                            />
                          ),
                          li: ({ ...props }) => (
                            <li className="mt-1" {...props} />
                          ),
                          strong: ({ ...props }) => (
                            <strong className="text-text" {...props} />
                          ),
                          a: ({ ...props }) => (
                            <a
                              className="text-primary hover:opacity-80"
                              target="_blank"
                              rel="noreferrer"
                              {...props}
                            />
                          ),
                          h3: ({ ...props }) => (
                            <h3
                              className="mt-8 text-lg font-semibold text-text"
                              {...props}
                            />
                          ),
                          blockquote: ({ ...props }) => (
                            <blockquote
                              className="border-l-2 border-border pl-4 text-muted"
                              {...props}
                            />
                          ),
                          code: ({ ...props }) => (
                            <code
                              className="rounded bg-surface-accent px-1 py-0.5 text-[0.9em] text-text"
                              {...props}
                            />
                          ),
                          // 일반 섹션 이미지 스타일(갤러리 외 이미지)
                          img: ({ src = '', ...props }) => {
                            const resolved = src.startsWith('/')
                              ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${src}`
                              : src
                            return (
                              <img
                                src={resolved}
                                className="my-6 w-full max-h-105 rounded-lg border border-border object-contain bg-surface-accent/30"
                                loading="lazy"
                                {...props}
                              />
                            )
                          },
                        }}
                      >
                        {rest}
                      </ReactMarkdown>
                    ) : null}
                  </div>
                </section>
              )
            })}
          </div>
        </article>
      </main>
    </PageShell>
  )
}
