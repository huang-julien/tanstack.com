import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import { Spinner } from './Spinner'

const meta = {
  component: Spinner,
  tags: ['ai-generated'],
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    const indicator = canvas.getByLabelText('Loading')
    await expect(indicator).toBeVisible()
    // The spinner relies on Tailwind's animate-spin utility — confirm the
    // class made it onto the rendered SVG.
    await expect(indicator.getAttribute('class')).toMatch(/animate-spin/)
  },
}

export const Larger: Story = {
  args: { className: 'text-6xl text-blue-500' },
  play: async ({ canvas }) => {
    const indicator = canvas.getByLabelText('Loading')
    await expect(indicator).toBeVisible()
  },
}
