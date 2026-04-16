import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { Tooltip } from './Tooltip'
import { Button } from '~/ui'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          'Floating UI tooltip with four placement directions and rich content support.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-20">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button size="sm">Hover me</Button>,
  },
}

export const Placements: Story = {
  args: { content: 'Tooltip', children: <span /> },
  render: () => (
    <div className="grid grid-cols-3 gap-8 place-items-center">
      <div />
      <Tooltip content="Top placement" placement="top">
        <Button variant="ghost" size="sm">
          Top
        </Button>
      </Tooltip>
      <div />

      <Tooltip content="Left placement" placement="left">
        <Button variant="ghost" size="sm">
          Left
        </Button>
      </Tooltip>
      <div />
      <Tooltip content="Right placement" placement="right">
        <Button variant="ghost" size="sm">
          Right
        </Button>
      </Tooltip>

      <div />
      <Tooltip content="Bottom placement" placement="bottom">
        <Button variant="ghost" size="sm">
          Bottom
        </Button>
      </Tooltip>
      <div />
    </div>
  ),
}

export const RichContent: Story = {
  args: {
    content: (
      <div className="flex flex-col gap-1">
        <strong>Keyboard shortcut</strong>
        <span className="opacity-70">⌘ + K</span>
      </div>
    ),
    children: <Button size="sm">With rich tooltip</Button>,
  },
}
