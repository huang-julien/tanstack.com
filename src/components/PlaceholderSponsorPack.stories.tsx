import type { Meta, StoryObj } from '@storybook/tanstack-react'
import PlaceholderSponsorPack from './PlaceholderSponsorPack'

const meta = {
  title: 'Components/PlaceholderSponsorPack',
  component: PlaceholderSponsorPack,
  parameters: {
    docs: {
      description: {
        component:
          'Placeholder grid displayed while sponsor data loads.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[600px] h-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PlaceholderSponsorPack>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
