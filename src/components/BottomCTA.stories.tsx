import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { BottomCTA } from './BottomCTA'

const meta = {
  title: 'Components/BottomCTA',
  component: BottomCTA,
  parameters: {
    docs: {
      description: {
        component: 'Call-to-action banner with a router-linked button.',
      },
    },
    tanstack: {
      router: {},
    },
  },
} satisfies Meta<typeof BottomCTA>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    linkProps: { to: '/router/latest' } as any,
    label: 'Get Started!',
  },
}

export const CustomLabel: Story = {
  args: {
    linkProps: { to: '/query/latest' } as any,
    label: 'Try TanStack Query',
  },
}
