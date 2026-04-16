import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { FrameworkCard } from './FrameworkCard'
import { ToastProvider } from './ToastProvider'
import { getFrameworkOptions } from '~/libraries/frameworks'
import type { Library } from '~/libraries'

const frameworks = getFrameworkOptions(['react', 'vue', 'solid', 'svelte'])
const reactFramework = frameworks[0]!

const mockLibrary = {
  id: 'router',
  name: 'TanStack Router',
  repo: 'tanstack/router',
  frameworks: ['react'],
  latestVersion: 'v1',
  availableVersions: ['v1'],
  tagline: 'Type-safe routing',
  cardStyles: '',
  bgStyle: 'bg-emerald-500',
  borderStyle: '',
  textStyle: '',
  colorFrom: 'from-emerald-500',
  colorTo: 'to-teal-500',
} as unknown as Library

const meta = {
  title: 'Components/FrameworkCard',
  component: FrameworkCard,
  parameters: {
    docs: {
      description: {
        component:
          'Framework selector card showing logo, name, and package with copy button.',
      },
    },
    tanstack: {
      router: {},
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="max-w-xs">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof FrameworkCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    framework: reactFramework,
    libraryId: 'router',
    version: 'latest',
    packageName: '@tanstack/react-router',
    index: 0,
    library: mockLibrary,
  },
}

export const Grid: Story = {
  args: {
    framework: reactFramework,
    libraryId: 'router',
    version: 'latest',
    packageName: '@tanstack/react-router',
    index: 0,
    library: mockLibrary,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-lg">
      {frameworks.map((fw, i) => (
        <FrameworkCard
          key={fw.value}
          framework={fw}
          libraryId="router"
          version="latest"
          packageName={`@tanstack/${fw.value}-router`}
          index={i}
          library={mockLibrary}
        />
      ))}
    </div>
  ),
}
