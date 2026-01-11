// src/lib/projectContent.ts

export type Frontmatter = {
  title?: string
  summary?: string
  period?: string
  role?: string
  team?: string
  tech?: string[]
  github?: string
}

export type MarkdownSection = {
  title: string
  content: string
}

export type ProjectContent = {
  frontmatter: Frontmatter
  sections: MarkdownSection[]
}

// Vite: md 파일을 "raw text"로 전부 가져오기
const modules = import.meta.glob('../content/projects/*.md', {
  as: 'raw',
  eager: true,
})

function splitByH2(markdown: string): MarkdownSection[] {
  const lines = markdown.split('\n')

  const sections: MarkdownSection[] = []
  let current: MarkdownSection | null = null

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.*)\s*$/)

    if (h2Match) {
      // 이전 섹션이 있으면 먼저 push
      if (current) sections.push(current)

      current = {
        title: h2Match[1].trim(),
        content: '',
      }
      continue
    }

    if (current) {
      current.content += line + '\n'
    }
  }

  // 마지막 섹션 push
  if (current) sections.push(current)

  // H2가 하나도 없으면 전체를 Overview로 처리
  if (sections.length === 0) {
    return [
      {
        title: 'Overview',
        content: markdown.trim(),
      },
    ]
  }

  // content 정리(앞뒤 공백 제거)
  return sections.map((s) => ({
    ...s,
    content: s.content.trim(),
  }))
}

/**
 * frontmatter만 파싱하고, 본문(body)을 분리해서 반환
 * 여기서는 ProjectContent를 반환하지 않음 (sections가 아직 없으니까!)
 */
function parseFrontmatter(raw: string): {
  frontmatter: Frontmatter
  body: string
} {
  // frontmatter가 없으면 전체를 body로
  if (!raw.startsWith('---')) {
    return { frontmatter: {}, body: raw.trim() }
  }

  const end = raw.indexOf('\n---', 3)
  if (end === -1) {
    return { frontmatter: {}, body: raw.trim() }
  }

  const fmBlock = raw.slice(3, end).trim()
  const body = raw.slice(end + '\n---'.length).trim()

  const frontmatter: Frontmatter = {}

  // 아주 단순한 YAML 형태만 지원
  // - key: value
  // - tech: [A, B, C]
  for (const line of fmBlock.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const idx = trimmed.indexOf(':')
    if (idx === -1) continue

    const key = trimmed.slice(0, idx).trim()
    let value = trimmed.slice(idx + 1).trim()

    // 따옴표 제거
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (key === 'tech') {
      if (value.startsWith('[') && value.endsWith(']')) {
        const inner = value.slice(1, -1).trim()
        frontmatter.tech = inner
          ? inner
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : []
      } else {
        frontmatter.tech = value ? [value] : []
      }
      continue
    }

    if (key === 'title') frontmatter.title = value
    if (key === 'summary') frontmatter.summary = value
    if (key === 'period') frontmatter.period = value
    if (key === 'role') frontmatter.role = value
    if (key === 'team') frontmatter.team = value
    if (key === 'github') frontmatter.github = value
  }

  return { frontmatter, body }
}

export function getProjectBySlug(slug: string): ProjectContent | null {
  const key = `../content/projects/${slug}.md`
  const raw = modules[key] as string | undefined
  if (!raw) return null

  const { frontmatter, body } = parseFrontmatter(raw)
  const sections = splitByH2(body)

  return { frontmatter, sections }
}
