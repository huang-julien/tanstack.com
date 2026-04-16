import { twMerge } from 'tailwind-merge'
import { Loader2 } from 'lucide-react'

interface SpinnerProps {
  /** Additional CSS classes to control size and color (e.g. `text-blue-500 text-4xl`). */
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <Loader2
      className={twMerge(
        'animate-spin text-gray-900 dark:text-white text-2xl',
        className,
      )}
      aria-label="Loading"
    />
  )
}
