import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import { Spinner } from './Spinner'
import preview from '../../.storybook/preview'

const meta = preview.meta({
  component: Spinner,
  tags: ['ai-generated'],
})

export default meta
type Story = StoryObj<typeof meta>

export const Default = meta.story({
  play: async ({ canvas }) => {
    const indicator = canvas.getByLabelText('Loading')
    await expect(indicator).toBeVisible()
    // The spinner relies on Tailwind's animate-spin utility — confirm the
    // class made it onto the rendered SVG.
    await expect(indicator.getAttribute('class')).toMatch(/animate-spin/)
  },
})

export const Larger = meta.story({
  args: { className: 'text-6xl text-blue-500' },
  play: async ({ canvas }) => {
    const indicator = canvas.getByLabelText('Loading')
    await expect(indicator).toBeVisible()
  },
})
