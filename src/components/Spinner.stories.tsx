import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { Spinner } from './Spinner'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          'Animated loading indicator with customizable size and color.',
      },
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomSize: Story = {
  args: { className: 'text-4xl' },
}

export const Colored: Story = {
  args: { className: 'text-blue-500' },
}
