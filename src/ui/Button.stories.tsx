import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import { Button } from './Button'
import preview from '../../.storybook/preview'

const meta = preview.meta({
  component: Button,
  tags: ['ai-generated'],
})

export default meta
type Story = StoryObj<typeof meta>

export const Primary = meta.story({
  args: {
    variant: 'primary',
    color: 'blue',
    children: 'Save changes',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /save changes/i })
    await expect(button).toBeVisible()
    await expect(button).toBeEnabled()
  },
})

export const Disabled = meta.story({
  args: {
    variant: 'primary',
    color: 'blue',
    disabled: true,
    children: 'Save changes',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /save changes/i })
    await expect(button).toBeDisabled()
  },
})

export const Secondary = meta.story({
  args: {
    variant: 'secondary',
    size: 'sm',
    children: 'Cancel',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /cancel/i })
    await expect(button).toBeVisible()
  },
})

export const Ghost = meta.story({
  args: {
    variant: 'ghost',
    children: 'Read more',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /read more/i }),
    ).toBeVisible()
  },
})

// CSS sanity check: Button "primary blue" must compile to Tailwind's
// bg-blue-600 — `oklch(0.546 0.245 262.881)` in Tailwind v4. If Tailwind /
// global CSS has not loaded, the computed background falls back to
// `rgba(0, 0, 0, 0)` and this assertion fails loudly.
export const CssCheck = meta.story({
  args: {
    variant: 'primary',
    color: 'blue',
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i })
    await expect(getComputedStyle(button).backgroundColor).toBe(
      'oklch(0.546 0.245 262.881)',
    )
  },
})
