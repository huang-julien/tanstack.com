import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { Button } from './Button'
import { Trash2, Plus, Settings } from 'lucide-react'

const meta = {
  title: 'UI/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Polymorphic button with multiple visual variants, color themes, and sizes.',
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
}

export const IconVariant: Story = {
  args: {
    variant: 'icon',
    children: <Settings className="w-4 h-4" />,
  },
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(
        [
          'blue',
          'green',
          'red',
          'orange',
          'purple',
          'gray',
          'emerald',
          'cyan',
          'yellow',
        ] as const
      ).map((color) => (
        <Button key={color} color={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Plus className="w-4 h-4" /> Create
      </>
    ),
  },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Destructive: Story = {
  args: {
    color: 'red',
    children: (
      <>
        <Trash2 className="w-4 h-4" /> Delete
      </>
    ),
  },
}
