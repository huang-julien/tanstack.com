import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { Badge } from './Badge'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  args: {
    children: 'Badge',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Small colored pill for status labels, tags, and indicators.',
      },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(
        [
          'default',
          'success',
          'warning',
          'error',
          'info',
          'purple',
          'teal',
          'orange',
        ] as const
      ).map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
}

export const Success: Story = {
  args: { variant: 'success', children: 'Active' },
}

export const Error: Story = {
  args: { variant: 'error', children: 'Failed' },
}

export const Warning: Story = {
  args: { variant: 'warning', children: 'Pending' },
}

export const Info: Story = {
  args: { variant: 'info', children: 'v5.0.0' },
}
