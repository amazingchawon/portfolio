import ExternalLinkIcon from '@/assets/icons/ExternalLinkIcon'
import Tag from '@/components/Tag'

// 이미지 import
import buliya from '@/assets/projects/buliya.png'
import ballogImg from '@/assets/projects/ballog.png'
import devbadakImg from '@/assets/projects/devoot.png'
import cineSeedImg from '@/assets/projects/cineseed.png'

type Project = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  href?: string
  award?: string
  tags: string[]
}

const PROJECTS: Project[] = [
  {
    title: '불이야',
    href: '#',
    imageSrc: buliya,
    imageAlt: '불이야 프로젝트 화면',
    description:
      '비상 상황에서 빠른 판단을 돕는 지하철 화재 감지 및 대피 안내 안드로이드 앱 서비스입니다. 실시간 CCTV와 지도 정보를 기반으로 비상 상황을 시각화하는 서비스로, 실시간 상황을 직관적으로 파악할 수 있도록 모바일 지도 기반 화면 흐름과 관리자용 웹 UI를 구현했습니다.',
    award: '화재보험협회상',
    tags: ['React', 'Tailwind CSS', 'JavaScript', 'MapBox'],
  },
  {
    title: '볼로그',
    href: '#',
    imageSrc: ballogImg,
    imageAlt: '볼로그 프로젝트 화면',
    description:
      '스마트워치 데이터를 기반으로 풋살 경기 기록과 흐름을 시각화한 모바일 서비스입니다. 사용자의 경기 활동이 한눈에 이해되도록 히트맵과 캘린더 중심의 화면 흐름을 설계하고 구현했습니다.',
    award: '우수상',
    tags: ['Kotlin', 'Samsung Health SDK'],
  },
  {
    title: '개발바닥',
    href: '#',
    imageSrc: devbadakImg,
    imageAlt: '개발바닥 프로젝트 화면',
    description:
      'IT 강의를 탐색하고 학습 과정을 기록할 수 있는 개발자 전용 SNS 서비스입니다. 로그인 상태와 사용자 인터랙션이 자연스럽게 이어지도록 전역 상태 흐름을 설계했습니다.',
    tags: ['Vue.js', 'Tailwind CSS', 'Firebase OAuth', 'Pinia'],
  },
  {
    title: '시네시드',
    href: '#',
    imageSrc: cineSeedImg,
    imageAlt: '시네시드 프로젝트 화면',
    description:
      '독립영화를 추천하고 제작 과정을 돕는 플랫폼 서비스입니다. 사용자의 선택에 따라 추천 결과가 달라지는 토너먼트형 인터랙션에서, 단계별 선택 상태와 결과 계산 로직이 분리되도록 화면 상태 구조를 설계했습니다.',
    tags: ['Vue.js', 'Pinia', 'Django'],
  },
]

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function Projects() {
  return (
    <section className="space-y-4">
      <h2 className="lg:hidden text-xl font-semibold text-text pb-4">
        프로젝트
      </h2>

      <div className="space-y-12">
        {PROJECTS.map((p) => (
          <article key={p.title} className="md:grid md:grid-cols-8 md:gap-10">
            <div className="md:col-span-2">
              <img
                src={p.imageSrc}
                alt={p.imageAlt}
                loading="lazy"
                className="h-auto w-full border border-border"
              />
            </div>

            <div className="mt-4 md:mt-0 md:col-span-6">
              {/* title + external link */}
              <div className="group flex gap-1">
                <h3 className="text-lg font-semibold text-text cursor-pointer">
                  {p.title}
                </h3>

                {p.href ? (
                  <a
                    className="inline-flex items-center gap-1 text-sm text-muted hover:text-text"
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.title} 링크 열기`}
                  >
                    <ExternalLinkIcon className="h-4 w-4 translate-y-px transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ) : null}
              </div>

              {/* description */}
              <div className="mt-3 space-y-2 text-muted font-light text-base/7">
                {p.description}
              </div>

              {/* award */}
              {p.award ? (
                <p className="mt-3 text-sm text-text cursor-default">
                  <span className="mr-1">🏅</span>
                  <span className="text-primary font-medium">{p.award}</span>
                </p>
              ) : null}

              {/* tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
