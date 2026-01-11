import { Link } from 'react-router-dom'
import PageShell from '@/components/PageShell'

export default function NotFoundPage() {
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-7xl px-6 lg:flex lg:gap-4">
        <aside className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24 md:pt-16 md:pb-8">
          <Link className="text-muted hover:text-text" to="/">
            ← 홈으로
          </Link>
          <h1 className="mt-6 text-4xl font-bold text-text">
            페이지를 찾을 수 없습니다.
          </h1>
        </aside>
      </main>
    </PageShell>
  )
}
