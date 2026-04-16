import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { Card } from './Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'Polymorphic container with shadow and border. Supports rendering as any element.',
      },
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Card Title</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Card content goes here. This is a basic card component.
        </p>
      </div>
    ),
  },
}

export const WithCustomClass: Story = {
  args: {
    className: 'p-8 hover:shadow-lg transition-shadow',
    children: (
      <>
        <h3 className="text-lg font-semibold mb-2">Hover me</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This card has a hover shadow effect.
        </p>
      </>
    ),
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    href: '#',
    className: 'p-6 block hover:shadow-lg transition-shadow cursor-pointer',
    children: (
      <>
        <h3 className="text-lg font-semibold mb-2">Clickable Card</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This card is rendered as an anchor element.
        </p>
      </>
    ),
  },
}

export const Grid: Story = {
  args: { children: 'Grid demo' },
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="p-4">
          <h4 className="font-medium">Card {i + 1}</h4>
          <p className="text-xs text-gray-500 mt-1">Description text</p>
        </Card>
      ))}
    </div>
  ),
}
