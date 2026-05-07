import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import { InlineCode } from './InlineCode'

const meta = {
  component: InlineCode,
  tags: ['ai-generated'],
} satisfies Meta<typeof InlineCode>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'pnpm install' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('pnpm install')).toBeVisible()
  },
}

export const InsideSentence: Story = {
  render: () => (
    <p className="text-sm">
      Run <InlineCode>pnpm dev</InlineCode> to start the local dev server.
    </p>
  ),
  play: async ({ canvas }) => {
    const code = canvas.getByText('pnpm dev')
    await expect(code).toBeVisible()
    // Ensures the InlineCode wrapper is its own element with rounded styling.
    await expect(code.tagName.toLowerCase()).toBe('span')
    await expect(code.className).toMatch(/rounded/)
  },
}
