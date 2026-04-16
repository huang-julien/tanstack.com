import type { Meta, StoryObj } from '@storybook/tanstack-react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from './Dropdown'
import { Button } from '~/ui'
import { Settings, LogOut, User, Moon } from 'lucide-react'

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      description: {
        component:
          'Radix UI dropdown menu with trigger, content, items, and separator.',
      },
    },
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          <Button variant="ghost" size="sm">
            Open Menu
          </Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem>Option 3</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}

export const WithIcons: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" /> Settings
          </Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>
            <User className="w-4 h-4" /> Profile
          </DropdownItem>
          <DropdownItem>
            <Moon className="w-4 h-4" /> Theme
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <LogOut className="w-4 h-4" /> Sign out
          </DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}

export const AlignStart: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          <Button variant="secondary" size="sm">
            Align Start
          </Button>
        </DropdownTrigger>
        <DropdownContent align="start">
          <DropdownItem>Item A</DropdownItem>
          <DropdownItem>Item B</DropdownItem>
          <DropdownItem>Item C</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}
