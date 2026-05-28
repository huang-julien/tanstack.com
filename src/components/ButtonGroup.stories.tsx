import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import { ButtonGroup } from './ButtonGroup'
import preview from '../../.storybook/preview'

const meta = preview.meta({
  component: ButtonGroup,
  tags: ['ai-generated'],
})

export default meta
type Story = StoryObj<typeof meta>

export const ThreeOptions = meta.story({
  args: {
    children: (
      <>
        <button type="button" className="px-3 py-2 text-sm">
          Day
        </button>
        <button type="button" className="px-3 py-2 text-sm font-semibold">
          Week
        </button>
        <button type="button" className="px-3 py-2 text-sm">
          Month
        </button>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /day/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /week/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /month/i })).toBeVisible()
  },
})

export const TwoOptions = meta.story({
  args: {
    children: (
      <>
        <button type="button" className="px-3 py-2 text-sm">
          Light
        </button>
        <button type="button" className="px-3 py-2 text-sm">
          Dark
        </button>
      </>
    ),
  },
  play: async ({ canvas, userEvent }) => {
    const light = canvas.getByRole('button', { name: /light/i })
    const dark = canvas.getByRole('button', { name: /dark/i })
    await userEvent.click(dark)
    await expect(light).toBeVisible()
    await expect(dark).toBeVisible()
  },
})
