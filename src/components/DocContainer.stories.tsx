import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import { DocContainer } from './DocContainer'

const meta = {
  component: DocContainer,
  tags: ['ai-generated'],
} satisfies Meta<typeof DocContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <article className="prose dark:prose-invert">
        <h2>Routing</h2>
        <p>
          TanStack Router provides type-safe routes you can rely on at the edge
          of your stack.
        </p>
      </article>
    ),
  },
  play: async ({ canvas }) => {
    const heading = canvas.getByRole('heading', { name: /routing/i })
    await expect(heading).toBeVisible()
    await expect(heading.tagName.toLowerCase()).toBe('h2')
  },
}

export const WithExtraClassName: Story = {
  args: {
    className: 'border border-dashed border-gray-300 p-4',
    children: <p data-testid="body">Custom-styled doc container.</p>,
  },
  play: async ({ canvas }) => {
    const body = canvas.getByTestId('body')
    await expect(body).toBeVisible()
    // twMerge should keep both the base `w-full max-w-full` and the override.
    const wrapper = body.parentElement!
    await expect(wrapper.className).toMatch(/w-full/)
    await expect(wrapper.className).toMatch(/border-dashed/)
  },
}
