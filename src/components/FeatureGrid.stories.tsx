import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { FeatureGrid } from './FeatureGrid'

const meta = {
  title: 'Components/FeatureGrid',
  component: FeatureGrid,
  parameters: {
    docs: {
      description: {
        component:
          'Responsive grid of feature items, each with a checkmark icon.',
      },
    },
  },
} satisfies Meta<typeof FeatureGrid>

export default meta
type Story = StoryObj<typeof meta>

const sampleItems = [
  'Type-safe by default',
  'Framework agnostic core',
  'Lightweight & tree-shakeable',
  'DevTools included',
  'SSR support',
  'First-class TypeScript',
  'Automatic caching',
  'Parallel queries',
  'Optimistic updates',
]

export const Default: Story = {
  args: { items: sampleItems },
}

export const WithTitle: Story = {
  args: {
    title: 'Features',
    items: sampleItems,
  },
}

export const TwoColumns: Story = {
  args: {
    title: 'Key Benefits',
    items: sampleItems.slice(0, 4),
    gridClassName: 'grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4',
  },
}
