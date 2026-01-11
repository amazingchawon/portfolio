import ExternalLinkIcon from '@/assets/icons/ExternalLinkIcon'
import Tag from '@/components/Tag'
import { Link } from 'react-router-dom'

// 이미지 import
import buliya from '@/assets/projects/buliya/buliya.png'
import ballogImg from '@/assets/projects/ballog/ballog.png'
import devbadakImg from '@/assets/projects/devoot/devoot.png'
import cineSeedImg from '@/assets/projects/cineseed/cineseed.png'

type Project = {
  slug: string
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
    slug: 'buliya',
    title: '불이야',
    href: 'https://github.com/amazingchawon/subway-fire-escape',
    imageSrc: buliya,
    imageAlt: '불이야 프로젝트 화면',
    description:
      '비상 상황에서 빠른 판단을 돕는 지하철 화재 감지 및 대피 안내 안드로이드 앱 서비스입니다. 실시간 CCTV와 지도 정보를 기반으로 비상 상황을 시각화하는 서비스로, 실시간 상황을 직관적으로 파악할 수 있도록 모바일 지도 기반 화면 흐름과 관리자용 웹 UI를 구현했습니다.',
    award: '화재보험협회상',
    tags: ['React', 'Tailwind CSS', 'JavaScript', 'MapBox'],
  },
  {
    slug: 'ballog',
    title: '볼로그',
    href: 'https://github.com/amazingchawon/Ballog',
    imageSrc: ballogImg,
    imageAlt: '볼로그 프로젝트 화면',
    description:
      '스마트워치 데이터를 기반으로 풋살 경기 기록과 흐름을 시각화한 모바일 서비스입니다. 사용자의 경기 활동이 한눈에 이해되도록 히트맵과 캘린더 중심의 화면 흐름을 설계하고 구현했습니다.',
    award: '우수상',
    tags: ['Kotlin', 'Samsung Health SDK'],
  },
  {
    slug: 'devoot',
    title: '개발바닥',
    href: 'https://github.com/amazingchawon/Devoot',
    imageSrc: devbadakImg,
    imageAlt: '개발바닥 프로젝트 화면',
    description:
      'IT 강의를 탐색하고 학습 과정을 기록할 수 있는 개발자 전용 SNS 서비스입니다. 로그인 상태와 사용자 인터랙션이 자연스럽게 이어지도록 전역 상태 흐름을 설계했습니다.',
    tags: ['Vue.js', 'Tailwind CSS', 'Firebase OAuth', 'Pinia'],
  },
  {
    slug: 'cineseed',
    title: '시네시드',
    href: 'https://github.com/wooya0123/CineSeed',
    imageSrc: cineSeedImg,
    imageAlt: '시네시드 프로젝트 화면',
    description:
      '독립영화를 추천하고 제작 과정을 돕는 플랫폼 서비스입니다. 사용자의 선택에 따라 추천 결과가 달라지는 토너먼트형 인터랙션에서, 단계별 선택 상태와 결과 계산 로직이 분리되도록 화면 상태 구조를 설계했습니다.',
    tags: ['Vue.js', 'Pinia', 'Django'],
  },
]

export default function Projects() {
  return (
    <section className="space-y-4" aria-labelledby="projects-title">
      <h2
        id="projects-title"
        className="pb-4 text-xl font-semibold text-text lg:hidden"
      >
        프로젝트
      </h2>

      <ul className="interactive-list space-y-12">
        {PROJECTS.map((p) => {
          return (
            <li
              key={p.title}
              className="interactive-list-item group relative md:grid md:grid-cols-8 md:gap-10"
            >
              {/* 카드 전체 클릭 오버레이 */}
              <Link
                to={`/projects/${p.slug}`}
                aria-label={`${p.title} 프로젝트 상세 보기`}
                className="absolute inset-0 z-20"
              ></Link>

              {/* background layer (hover 시 등장) */}
              <div
                aria-hidden
                className="interactive-list-item-bg pointer-events-none"
              />

              {/* content layer: 오버레이가 클릭을 가져가도록 pointer-events 끔 */}
              <div className="relative z-10 pointer-events-none md:col-span-2">
                <img
                  src={p.imageSrc}
                  alt={p.imageAlt}
                  loading="lazy"
                  className="h-auto w-full border border-border"
                />
              </div>

              <article className="relative z-10 mt-4 pointer-events-none md:col-span-6 md:mt-0">
                {/* title + external link */}
                <div className="flex items-center gap-1">
                  <h3 className="text-lg font-semibold text-text group-hover:text-primary">
                    {p.title}
                  </h3>

                  <ExternalLinkIcon className="h-4 w-4 translate-y-px transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                </div>

                {/* description */}
                <p className="mt-3 text-base/7 font-light text-muted">
                  {p.description}
                </p>

                {/* award */}
                {p.award ? (
                  <p className="mt-3 text-sm text-text">
                    <span className="mr-1" aria-hidden>
                      🏅
                    </span>
                    <span className="font-medium text-primary">{p.award}</span>
                  </p>
                ) : null}

                {/* tags */}
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
