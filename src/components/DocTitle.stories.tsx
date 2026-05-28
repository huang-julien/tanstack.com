import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import { DocTitle } from './DocTitle'
import preview from '../../.storybook/preview'

const meta = preview.meta({
  component: DocTitle,
  tags: ['ai-generated'],
})

export default meta
type Story = StoryObj<typeof meta>

export const Plain = meta.story({
  args: {
    children: 'Getting Started',
  },
  play: async ({ canvas }) => {
    const heading = canvas.getByRole('heading', { name: /getting started/i })
    await expect(heading).toBeVisible()
    await expect(heading.tagName.toLowerCase()).toBe('h1')
    // Confirms the Tailwind utility classes survived the build pipeline.
    await expect(heading.className).toMatch(/font-black/)
  },
})

export const WithBadge = meta.story({
  args: {
    children: (
      <>
        Quick Start
        <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-medium">
          new
        </span>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /quick start/i }),
    ).toBeVisible()
    await expect(canvas.getByText('new')).toBeVisible()
  },
})
