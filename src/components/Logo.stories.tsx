import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { Logo } from './Logo'
import { LogoColor } from './LogoColor'
import { ToastProvider } from './ToastProvider'

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    docs: {
      description: {
        component:
          'TanStack brand logos in monochrome and color variants.',
      },
    },
    tanstack: {
      router: {},
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="w-32 h-32">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = {
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="w-16 h-16">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
}

export const Large: Story = {
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="w-64 h-64">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
}

export const Color: StoryObj<typeof LogoColor> = {
  render: () => <LogoColor />,
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="w-32 h-32">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
}

export const ColorLarge: StoryObj<typeof LogoColor> = {
  render: () => <LogoColor />,
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="w-64 h-64">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
}

export const SideBySide: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="w-32 h-32">
        <Logo />
      </div>
      <div className="w-32 h-32">
        <LogoColor />
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
}
