import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import { Card } from './Card'

const meta = {
  component: Card,
  tags: ['ai-generated'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
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
}

export const AsArticle: Story = {
  args: {
    as: 'article',
    className: 'p-6 max-w-sm',
    'aria-label': 'Release notes',
    children: <p>v10 ships with a brand new Storybook setup.</p>,
  },
  play: async ({ canvas }) => {
    const article = canvas.getByRole('article', { name: /release notes/i })
    await expect(article).toBeVisible()
    await expect(article.tagName.toLowerCase()).toBe('article')
  },
}
