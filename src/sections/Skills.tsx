export default function Skills() {
  return (
    <section className="space-y-4">
      <h2 className="lg:hidden text-xl font-semibold text-text pb-4">기술</h2>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 font-light">
        {/* 언어 */}
        <div>
          <h3 className="mb-3 text-md font-medium text-text">언어</h3>
          <ul className="space-y-1 text-sm text-muted">
            <li>JavaScript</li>
            <li>Python</li>
            <li>Java</li>
            <li>HTML</li>
            <li>CSS</li>
          </ul>
        </div>

        {/* 프레임워크 */}
        <div>
          <h3 className="mb-3 text-md font-medium text-text">프레임워크</h3>
          <ul className="space-y-1 text-sm text-muted">
            <li>React</li>
            <li>Vue.js</li>
            <li>Django</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>

        {/* 툴 */}
        <div>
          <h3 className="mb-3 text-md font-medium text-text">툴</h3>
          <ul className="space-y-1 text-sm text-muted">
            <li>Git</li>
            <li>Notion</li>
            <li>Jira</li>
          </ul>
        </div>

        {/* 디자인 */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-text">디자인</h3>
          <ul className="space-y-1 text-sm text-muted">
            <li>Figma</li>
            <li>Adobe Illustrator</li>
            <li>Adobe After Effects</li>
            <li>Adobe InDesign</li>
            <li>Maya</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
