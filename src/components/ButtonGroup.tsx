import * as React from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonGroupProps = {
  /** Button elements to group together. */
  children: React.ReactNode
  /** Additional CSS classes. */
  className?: string
}

export function ButtonGroup({ children, className }: ButtonGroupProps) {
  return (
    <div
      className={twMerge(
        'inline-flex items-stretch rounded-md overflow-hidden',
        'border border-gray-200 dark:border-gray-700',
        'divide-x divide-gray-200 dark:divide-gray-700',
        'bg-white dark:bg-gray-800',
        'shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}
