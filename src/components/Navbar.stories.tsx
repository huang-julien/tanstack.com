import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { Navbar } from './Navbar'
import { ThemeProvider } from './ThemeProvider'
import { ToastProvider } from './ToastProvider'
import { SearchProvider } from '~/contexts/SearchContext'

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    docs: {
      description: {
        component:
          'Site-wide navigation bar with menu, search, theme toggle, and auth controls.',
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <ToastProvider>
          <SearchProvider>
            <Story />
          </SearchProvider>
        </ToastProvider>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Page Content</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          This is the main content area below the navbar. Scroll down to see the
          navbar behavior.
        </p>
        <div className="mt-8 space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </div>
    ),
  },
}

export const WithShortContent: Story = {
  args: {
    children: (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Short Page</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          A page with minimal content.
        </p>
      </div>
    ),
  },
}
