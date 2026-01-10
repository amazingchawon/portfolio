type Props = {
  className?: string
}

export default function NavMark({ className }: Props) {
  return (
    <svg
      viewBox="-2 -2 21 22" // to prevent clipping during rotation
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g className="navmark__g">
        {/* center horizontal line */}
        <line
          className="navmark__stem"
          x1="8.446"
          y1="0"
          x2="8.446"
          y2="18"
          vectorEffect="non-scaling-stroke"
        />
        {/* diagonals */}
        <line
          className="navmark__d1"
          x1="0.505"
          y1="4.566"
          x2="15.972"
          y2="13.496"
          vectorEffect="non-scaling-stroke"
        />
        <line
          className="navmark__d2"
          x1="16.178"
          y1="4.536"
          x2="0.714"
          y2="13.464"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}
