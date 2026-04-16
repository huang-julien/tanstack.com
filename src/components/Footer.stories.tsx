import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { Footer } from './Footer'

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    docs: {
      description: {
        component: 'Site footer with organized link grid.',
      },
    },
    tanstack: {
      router: {},
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
