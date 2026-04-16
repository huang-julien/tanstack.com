import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { twMerge } from 'tailwind-merge'

type DropdownProps = {
  /** Dropdown content (Trigger + Content). */
  children: React.ReactNode
  /** Controlled open state. */
  open?: boolean
  /** Callback fired when open state changes. */
  onOpenChange?: (open: boolean) => void
  /** Whether the dropdown should be modal (trap focus). @default false */
  modal?: boolean
}

type DropdownTriggerProps = {
  /** Element that opens the dropdown. */
  children: React.ReactNode
  /** Additional CSS classes. */
  className?: string
  /** Merge props onto the child element instead of wrapping. */
  asChild?: boolean
}

type DropdownContentProps = {
  /** Menu items. */
  children: React.ReactNode
  /** Additional CSS classes. */
  className?: string
  /** Horizontal alignment relative to the trigger. @default 'end' */
  align?: 'start' | 'center' | 'end'
  /** Distance from the trigger in pixels. @default 4 */
  sideOffset?: number
}

type DropdownItemProps = {
  /** Item content. */
  children: React.ReactNode
  /** Additional CSS classes. */
  className?: string
  /** Callback when the item is selected. */
  onSelect?: () => void
  /** Merge props onto the child element instead of wrapping. */
  asChild?: boolean
}

type DropdownSeparatorProps = {
  /** Additional CSS classes. */
  className?: string
}

export function Dropdown({
  children,
  open,
  onOpenChange,
  modal = false,
}: DropdownProps) {
  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange} modal={modal}>
      {children}
    </DropdownMenu.Root>
  )
}

export function DropdownTrigger({
  children,
  className,
  asChild = true,
}: DropdownTriggerProps) {
  return (
    <DropdownMenu.Trigger asChild={asChild} className={className}>
      {children}
    </DropdownMenu.Trigger>
  )
}

export function DropdownContent({
  children,
  className,
  align = 'end',
  sideOffset = 6,
}: DropdownContentProps) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        align={align}
        sideOffset={sideOffset}
        className={twMerge(
          'dropdown-content z-[1000] min-w-48 rounded-lg p-1.5',
          'border border-gray-200 dark:border-gray-700',
          'bg-white dark:bg-gray-800',
          'shadow-lg',
          className,
        )}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  )
}

export function DropdownItem({
  children,
  className,
  onSelect,
  asChild,
}: DropdownItemProps) {
  return (
    <DropdownMenu.Item
      asChild={asChild}
      onSelect={onSelect}
      className={twMerge(
        'flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 outline-none',
        'text-sm text-gray-700 dark:text-gray-300',
        'hover:bg-gray-100 dark:hover:bg-gray-700/50',
        'focus:bg-gray-100 dark:focus:bg-gray-700/50',
        'transition-colors duration-150',
        className,
      )}
    >
      {children}
    </DropdownMenu.Item>
  )
}

export function DropdownSeparator({ className }: DropdownSeparatorProps) {
  return (
    <DropdownMenu.Separator
      className={twMerge('my-1 h-px bg-gray-200 dark:bg-gray-700', className)}
    />
  )
}
