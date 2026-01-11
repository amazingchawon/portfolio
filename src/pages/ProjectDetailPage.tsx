import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import PageShell from '@/components/PageShell'
import { getProjectBySlug } from '@/lib/projectContent'

import ArrowBackIcon from '@/assets/icons/ArrowBackIcon'
import ExternalLinkIcon from '@/assets/icons/ExternalLinkIcon'

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function ProjectDetailPage() {
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
      <main className="mx-auto w-full min-h-dvh max-w-7xl px-6 lg:flex lg:gap-4">
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

            {frontmatter.summary ? (
              <p className="mt-4 font-light text-muted">
                {frontmatter.summary}
              </p>
            ) : null}

            {/* Meta */}
            <dl className="relative mt-4 space-y-3 text-sm">
              {/* vertical divider */}
              <div
                aria-hidden
                className="absolute left-16 top-0 h-full w-px bg-border"
              />

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
              const id = section.title
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')

              return (
                <section key={id} id={id} className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-text">
                    {section.title}
                  </h2>

                  <div className="mt-4 space-y-4">
                    <ReactMarkdown
                      components={{
                        img: ({ ...props }) => (
                          <img
                            className="my-6 w-full max-h-[420px] object-contain rounded-lg"
                            loading="lazy"
                            {...props}
                          />
                        ),
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
                            className={cx('text-primary hover:opacity-80')}
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
                      }}
                    >
                      {section.content}
                    </ReactMarkdown>
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
