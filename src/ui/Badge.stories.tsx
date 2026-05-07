import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import { Badge } from './Badge'

const meta = {
  component: Badge,
  tags: ['ai-generated'],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Stable' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Stable')).toBeVisible()
  },
}

export const Success: Story = {
  args: { variant: 'success', children: 'Passing' },
  play: async ({ canvas }) => {
    const badge = canvas.getByText('Passing')
    await expect(badge).toBeVisible()
    // Variant-specific class proves variantStyles applied; the surrounding
    // CSS sanity check lives in Button.stories.tsx (CssCheck story).
    await expect(badge.className).toMatch(/bg-green-100/)
  },
}

export const Error: Story = {
  args: { variant: 'error', children: 'Failed' },
  play: async ({ canvas }) => {
    const badge = canvas.getByText('Failed')
    await expect(badge).toBeVisible()
    await expect(badge.className).toMatch(/bg-red-100/)
  },
}
