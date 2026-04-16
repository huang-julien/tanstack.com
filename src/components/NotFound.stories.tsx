import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { NotFound } from './NotFound'

const meta = {
  title: 'Components/NotFound',
  component: NotFound,
  parameters: {
    docs: {
      description: {
        component: '404 page component with animated background.',
      },
    },
    tanstack: {
      router: {
        // Provide a minimal route so Link components render
        location: { href: '/' },
      },
    },
  },
} satisfies Meta<typeof NotFound>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithCustomChildren: Story = {
  args: {
    children: (
      <div className="text-center text-gray-500">
        <p>The documentation page you were looking for has been moved.</p>
        <a href="/" className="text-blue-500 underline mt-2 inline-block">
          Go to documentation home
        </a>
      </div>
    ),
  },
}
