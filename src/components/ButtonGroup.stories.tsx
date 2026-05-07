import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import { ButtonGroup } from './ButtonGroup'

const meta = {
  component: ButtonGroup,
  tags: ['ai-generated'],
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const ThreeOptions: Story = {
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
}

export const TwoOptions: Story = {
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
}
