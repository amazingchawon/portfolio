import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const STORAGE_KEY = 'scroll:home'

export default function ScrollRestoration() {
  const location = useLocation()
  const navType = useNavigationType() // POP (뒤로가기), PUSH, REPLACE

  // 홈에서 나갈 때 스크롤 저장
  useEffect(() => {
    const onBeforeUnloadOrRouteChange = () => {
      if (location.pathname === '/') {
        sessionStorage.setItem(STORAGE_KEY, String(window.scrollY))
      }
    }

    // route change 직전에 저장되도록 cleanup에서 저장하는 패턴
    return () => onBeforeUnloadOrRouteChange()
  }, [location.pathname])

  // 라우트 들어왔을 때 스크롤 정책 적용
  useEffect(() => {
    const isHome = location.pathname === '/'
    const isProjectDetail = location.pathname.startsWith('/projects/')

    // 1) 프로젝트 상세는 무조건 맨 위
    if (isProjectDetail) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    // 2) 홈은 "돌아왔을 때" 이전 위치 복원
    if (isHome) {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      const y = saved ? Number(saved) : 0

      // 뒤로/앞으로(POP) 또는 상세에서 홈으로 돌아오는 흐름에서 복원
      if (navType === 'POP' || y > 0) {
        window.scrollTo({ top: y, left: 0, behavior: 'auto' })
      } else {
        // 최초 진입이면 맨 위
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    }
  }, [location.key, location.pathname, navType])

  return null
}
