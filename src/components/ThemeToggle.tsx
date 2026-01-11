import { useEffect, useState } from 'react'
import SunIcon from '@/assets/icons/SunIcon'
import MoonIcon from '@/assets/icons/MoonIcon'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'theme'

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  // 초기 테마 설정: localStorage > 시스템 설정
  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? null
    const initial = saved ?? getSystemTheme()
    setTheme(initial)
    applyTheme(initial)
  }, [])

  // 시스템 테마 변경을 따라가고 싶으면(저장값 없을 때만) 사용
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mq) return

    const onChange = () => {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (saved) return // 사용자가 선택했다면 시스템 변경 무시
      const next = mq.matches ? 'dark' : 'light'
      setTheme(next)
      applyTheme(next)
    }

    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'

    // View Transition 지원 시 더 매끄럽게
    const anyDoc = document as any
    if (anyDoc.startViewTransition) {
      anyDoc.startViewTransition(() => {
        setTheme(next)
        localStorage.setItem(STORAGE_KEY, next)
        applyTheme(next)
      })
      return
    }

    setTheme(next)
    localStorage.setItem(STORAGE_KEY, next)
    applyTheme(next)
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className="group inline-flex items-center gap-2 text-sm text-muted/50 hover:text-primary transition-colors"
    >
      <span className="transition-colors duration-200 ease-out group-hover:bg-surfaceAccent">
        {isDark ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </span>
    </button>
  )
}
