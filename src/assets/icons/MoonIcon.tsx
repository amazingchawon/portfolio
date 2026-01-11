type Props = {
  className?: string
}

export default function MoonIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* <path
        stroke="currentColor"
        fill="none"
        stroke-linejoin="butt"
        stroke-width="2"
        d="M21.6 14.64c-.902.273-1.86.42-2.851.42-5.418 0-9.81-4.392-9.81-9.81 0-.991.147-1.948.42-2.85C5.332 3.622 2.4 7.363 2.4 11.79c0 5.418 4.392 9.81 9.81 9.81 4.427 0 8.169-2.932 9.39-6.96Z"
      /> */}

      <path
        fill="currentColor"
        d="M12 22c5.523 0 10-4.477 10-10 0-.463-.694-.54-.933-.143a6.502 6.502 0 0 1-11.71-1.24 6.5 6.5 0 0 1 2.786-7.684C12.54 2.693 12.463 2 12 2 6.477 2 2 6.477 2 12s4.477 10 10 10Z"
      />
    </svg>
  )
}
