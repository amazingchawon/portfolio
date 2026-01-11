export default function About() {
  return (
    <div className="space-y-4 font-light">
      <h2 className="pb-4 text-xl font-semibold text-text lg:hidden">소개</h2>

      <div className="space-y-2 font-light text-muted">
        <p>
          <span className="font-normal text-primary">디자인의 감각</span>에
          <span className="font-normal text-primary"> 개발의 논리</span>를 더해,
          사용자 경험을 구현합니다.
        </p>

        <p>
          시각적인 완성도가 정적인 화면에 머무르는 것에 아쉬움을 느껴 직접
          사용자 경험을 구현하는 프론트엔드 개발자가 되었습니다. 디자인
          전공으로서의 시각적 기준과, 개발 과정에서 쌓아온 구조적 사고를
          바탕으로 사용자 경험을 구현하는 프론트엔드 개발자를 지향합니다.
        </p>
      </div>

      {/* list focus + hover highlight */}
      <ul className="interactive-list mt-10 space-y-12">
        <li className="interactive-list-item group flex flex-col lg:grid lg:grid-cols-8 lg:items-start">
          {/* background layer */}
          <div aria-hidden className="interactive-list-item-bg" />

          <h3 className="relative z-10 w-full text-md font-medium text-text transition-colors duration-200 lg:col-span-2 group-hover:text-primary">
            Systematic Thinker
          </h3>
          <p className="relative z-10 mt-2 w-full leading-relaxed text-muted lg:mt-0 lg:col-span-6">
            디자인 시스템을 코드로 추상화해 재사용 가능한 컴포넌트 구조를
            설계합니다. 확장성과 유지보수를 고려한 책임 분리를 중요하게
            생각합니다.
          </p>
        </li>

        <li className="interactive-list-item group flex flex-col lg:grid lg:grid-cols-8 lg:items-start">
          <div aria-hidden className="interactive-list-item-bg" />

          <h3 className="relative z-10 w-full text-md font-medium text-text transition-colors duration-200 lg:col-span-2 group-hover:text-primary">
            Detail-Oriented
          </h3>
          <p className="relative z-10 mt-2 w-full leading-relaxed text-muted lg:mt-0 lg:col-span-6">
            사용자 흐름을 기준으로 UI를 설계하고, 반응형과 접근성을 고려해
            디자인 의도를 현실적인 구현으로 옮깁니다.
          </p>
        </li>

        <li className="interactive-list-item group flex flex-col lg:grid lg:grid-cols-8 lg:items-start">
          <div aria-hidden className="interactive-list-item-bg" />

          <h3 className="relative z-10 w-full text-md font-medium text-text transition-colors duration-200 lg:col-span-2 group-hover:text-primary">
            Multidisciplinary Communicator
          </h3>
          <p className="relative z-10 mt-2 w-full leading-relaxed text-muted lg:mt-0 lg:col-span-6">
            디자이너와 개발자의 관점을 모두 이해하며, 추상적인 의도를 구현
            가능한 구조로 정리합니다.
          </p>
        </li>
      </ul>
    </div>
  )
}
