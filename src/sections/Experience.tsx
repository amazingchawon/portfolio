type Experience = {
  period: string
  title: string
  description: React.ReactNode[]
}

const EXPERIENCES: Experience[] = [
  {
    period: '2024 - 2025',
    title: '삼성 청년 SW AI 아카데미',
    description: [
      <>
        삼성이 주관하는 차세대 SW 인재 양성 교육을{' '}
        <span className="text-primary font-medium">우수 등급</span>으로
        이수하였습니다. 1학기 코딩 집중과정에서 데이터 구조, 알고리즘, 웹 개발에
        대한 지식을 쌓았고, 2학기 심화 프로젝트 과정에서 실무 능력과 팀 단위
        협업과 코드 리뷰를 통해 협업 능력과 커뮤니케이션 역량도 함께
        발전시켰습니다.
      </>,
    ],
  },
  {
    period: '2024.01 - 2024.06',
    title: 'TECHIT 디자인 스쿨',
    description: [
      <>
        멋쟁이사자처럼과 듀오톤이 제공하는 사용자를 사로잡는 프로덕트 디자이너가
        되기 위한 UX/UI 필수 역량 교육 커리큘럼을 이수하였습니다. UX/UI 역량
        교육을 통해 와이어프레임과 사용자 여정을 이해하고, 이를 실제 컴포넌트
        단위로 어떻게 구현할지를 고민하는 경험을 쌓았습니다.
      </>,
    ],
  },
  {
    period: '2019 - 2024',
    title: '국민대학교',
    description: [
      <>
        본전공 : 영상디자인학과
        <br />
        융합전공 : 디지털엔터테인먼트학과 (소프트웨어 학과)
      </>,
    ],
  },
]

type RecordItem = {
  period: string
  title: React.ReactNode
}

const AWARDS: RecordItem[] = [
  {
    period: '2025.09',
    title: (
      <>
        제5회 소방안전 빅데이터 활용 및 아이디어 경진대회{' '}
        <span className="text-primary font-medium">우수상</span>
      </>
    ),
  },
  {
    period: '2025.05',
    title: (
      <>
        삼성 청년 SW AI 아카데미 프로젝트 [블로그]{' '}
        <span className="text-primary font-medium">우수상</span>
      </>
    ),
  },
  {
    period: '2024.11',
    title: (
      <>
        삼성 청년 SW AI 아카데미 프로젝트{' '}
        <span className="text-primary font-medium">1학기 성적 우수상</span>
      </>
    ),
  },
  {
    period: '2024.02',
    title: (
      <>
        국민대학교 <span className="text-primary font-medium">공로상</span>
      </>
    ),
  },
]

const CERTIFICATES: RecordItem[] = [
  { period: '2025.12', title: <>SQLD</> },
  { period: '2025.12', title: <>정보처리기사</> },
]

export default function Experiences() {
  return (
    <div className=" space-y-6">
      <h2 className="lg:hidden text-xl font-semibold text-text pb-4">경험</h2>

      <ul className="interactive-list space-y-12">
        {EXPERIENCES.map((exp) => (
          <li
            key={`${exp.period}-${exp.title}`}
            className="interactive-list-item md:grid md:grid-cols-8"
          >
            <div aria-hidden className="interactive-list-item-bg" />

            <p className="relative z-10 text-sm font-mono text-muted md:col-span-2 md:mt-1 md:self-start">
              {exp.period}
            </p>

            <div className="relative z-10 mt-3 md:mt-0 md:col-span-6">
              <h3 className="text-md font-medium text-text">{exp.title}</h3>

              {exp.description.length > 0 && (
                <div className="mt-1 md:mt-2 space-y-2 text-muted font-light text-base/7">
                  {exp.description}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Awards */}
      <RecordSection title="Awards" items={AWARDS} />

      {/* Certificate */}
      <RecordSection title="Certificate" items={CERTIFICATES} />
    </div>
  )
}

function RecordSection({
  title,
  items,
}: {
  title: string
  items: RecordItem[]
}) {
  return (
    <div className="space-y-4 mt-16">
      <h3 className="text-md font-medium text-text">{title}</h3>

      <div className="space-y-6">
        {items.map((item, idx) => (
          <div key={idx} className="md:grid md:grid-cols-8 md:gap-4">
            <p className="text-sm font-mono text-muted md:col-span-2 md:self-start">
              {item.period}
            </p>
            <p className="mt-1 text-sm text-medium text-text md:col-span-6 md:mt-0">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
