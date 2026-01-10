type TagProps = {
  children: React.ReactNode
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface-accent px-3 py-1 text-xs font-medium text-primary">
      {children}
    </span>
  )
}
