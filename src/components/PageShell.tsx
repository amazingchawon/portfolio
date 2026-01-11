import { useEffect } from 'react'

type Props = {
  children: React.ReactNode
  showSpotlight?: boolean
}

export default function PageShell({ children, showSpotlight = true }: Props) {
  // 커서 좌표를 CSS 변수로 업데이트
  useEffect(() => {
    if (!showSpotlight) return

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
  }, [showSpotlight])

  return (
    <div className="relative min-h-dvh bg-bg text-text cursor-default">
      {/* spotlight overlay (클릭/스크롤 방해 X) */}
      {showSpotlight && (
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
      )}

      {/* 실제 콘텐츠는 overlay 위로 */}
      <div className="relative z-20">{children}</div>
    </div>
  )
}
