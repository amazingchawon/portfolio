type Props = {
  className?: string
}

export default function ExternalLinkIcon({ className }: Props) {
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
        d="m4.267 11.833-.934-.933 6.4-6.4H4V3.167h8v8h-1.333V5.433l-6.4 6.4Z"
      />
    </svg>
  )
}
