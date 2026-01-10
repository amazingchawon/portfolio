export default function About() {
  return (
    <div className="space-y-4 font-light">
      <h2 className="lg:hidden text-xl font-semibold text-text pb-4">소개</h2>
      <div className="text-muted space-y-2 font-light">
        <p>
          <span className="text-primary font-normal">디자인의 감각</span>에
          <span className="text-primary font-normal"> 개발의 논리</span>를 더해,
          사용자 경험을 구현합니다.
        </p>

        <p>
          시각적인 완성도가 정적인 화면에 머무르는 것에 아쉬움을 느껴 직접
          사용자 경험을 구현하는 프론트엔드 개발자가 되었습니다. 디자인
          전공으로서의 시각적 기준과, 개발 과정에서 쌓아온 구조적 사고를
          바탕으로 사용자 경험을 구현하는 프론트엔드 개발자를 지향합니다.
        </p>
      </div>

      <div className="mt-10">
        <div className="flex flex-col py-6 lg:flex-row lg:items-start group">
          <h3 className="w-full text-md font-medium text-text lg:w-1/3 group-hover:text-primary transition-colors">
            Systematic Thinking
          </h3>
          <p className="mt-2 w-full leading-relaxed text-muted lg:mt-0 lg:w-2/3">
            디자인 시스템을 코드로 추상화해 재사용 가능한 컴포넌트 구조를
            설계합니다. 확장성과 유지보수를 고려한 책임 분리를 중요하게
            생각합니다.
          </p>
        </div>

        <div className="flex flex-col py-6 lg:flex-row lg:items-start group">
          <h3 className="w-full text-md font-medium text-text lg:w-1/3 group-hover:text-primary transition-colors">
            Attention to Detail
          </h3>
          <p className="mt-2 w-full leading-relaxed text-muted lg:mt-0 lg:w-2/3">
            사용자 흐름을 기준으로 UI를 설계하고, 반응형과 접근성을 고려해
            디자인 의도를 현실적인 구현으로 옮깁니다.
          </p>
        </div>

        <div className="flex flex-col py-6 lg:flex-row lg:items-start group">
          <h3 className="w-full text-md font-medium text-text lg:w-1/3 group-hover:text-primary transition-colors">
            Bridge Communication
          </h3>
          <p className="mt-2 w-full leading-relaxed text-muted lg:mt-0 lg:w-2/3">
            디자이너와 개발자의 관점을 모두 이해하며, 추상적인 의도를 구현
            가능한 구조로 정리합니다.
          </p>
        </div>
      </div>
    </div>
  )
}
