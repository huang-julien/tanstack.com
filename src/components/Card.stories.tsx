import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import { Card } from './Card'
import preview from '../../.storybook/preview'

const meta = preview.meta({
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
})

export default meta
type Story = StoryObj<typeof meta>

export const Basic = meta.story({
  args: {
    className: 'p-6 max-w-sm',
    children: (
      <>
        <h3 className="text-lg font-semibold">Open source quality</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Headless, type-safe, and tested in production.
        </p>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /open source quality/i }),
    ).toBeVisible()
  },
})

export const AsArticle = meta.story({
  name: 'As <article>',
  args: {
    as: 'article',
    className: 'p-6 max-w-sm',
    children: (
      <>
        <h3 className="text-lg font-semibold">Open source quality</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Headless, type-safe, and tested in production.
        </p>
      </>
    ),
  },
})
