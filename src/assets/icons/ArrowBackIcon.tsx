type Props = {
  className?: string
}

export default function ArrowBackIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M5.217 8.667 8.95 12.4l-.95.933L2.667 8 8 2.667l.95.933-3.733 3.733h8.116v1.334H5.217Z"
      />
    </svg>
  )
}
