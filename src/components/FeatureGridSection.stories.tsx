import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { FeatureGridSection } from './FeatureGridSection'

const meta = {
  title: 'Components/FeatureGridSection',
  component: FeatureGridSection,
  parameters: {
    docs: {
      description: {
        component:
          'Feature section with title, description, and feature grid.',
      },
    },
  },
} satisfies Meta<typeof FeatureGridSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Why TanStack Query?',
    description:
      'Powerful asynchronous state management for TS/JS, React, Solid, Vue, Svelte and Angular.',
    items: [
      'Declarative & Automatic',
      'Simple & Familiar',
      'Extensible',
      'Built-in Caching',
      'Devtools',
      'Auto Refetching',
    ],
  },
}

export const WithoutDescription: Story = {
  args: {
    title: 'Core Features',
    items: [
      'Type-safe routing',
      'File-based routes',
      'Nested layouts',
      'Search params validation',
    ],
  },
}
