import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { ButtonGroup } from './ButtonGroup'
import { Button } from '~/ui'

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Groups buttons into a single visual unit with shared borders and dividers.',
      },
    },
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <button className="px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
          Left
        </button>
        <button className="px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
          Center
        </button>
        <button className="px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
          Right
        </button>
      </>
    ),
  },
}

export const WithActiveState: Story = {
  args: {
    children: (
      <>
        <button className="px-3 py-1.5 text-sm bg-blue-500 text-white">
          Active
        </button>
        <button className="px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
          Inactive
        </button>
        <button className="px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
          Inactive
        </button>
      </>
    ),
  },
}

export const WithUIButtons: Story = {
  args: { children: 'Buttons' },
  render: () => (
    <ButtonGroup>
      <Button variant="ghost" rounded="none" size="sm">
        Day
      </Button>
      <Button variant="ghost" rounded="none" size="sm">
        Week
      </Button>
      <Button variant="ghost" rounded="none" size="sm">
        Month
      </Button>
    </ButtonGroup>
  ),
}
