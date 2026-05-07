import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import { Button } from './Button'

const meta = {
  component: Button,
  tags: ['ai-generated'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
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
}

export const Disabled: Story = {
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
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'sm',
    children: 'Cancel',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /cancel/i })
    await expect(button).toBeVisible()
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Read more',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: /read more/i }),
    ).toBeVisible()
  },
}

// CSS sanity check: Button "primary blue" must compile to Tailwind's
// bg-blue-600 — `oklch(0.546 0.245 262.881)` in Tailwind v4. If Tailwind /
// global CSS has not loaded, the computed background falls back to
// `rgba(0, 0, 0, 0)` and this assertion fails loudly.
export const CssCheck: Story = {
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
}
