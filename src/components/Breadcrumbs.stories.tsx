import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { Breadcrumbs } from './Breadcrumbs'

const sampleHeadings = [
  { id: 'introduction', text: 'Introduction', level: 2 },
  { id: 'installation', text: 'Installation', level: 2 },
  { id: 'npm', text: 'npm', level: 3 },
  { id: 'pnpm', text: 'pnpm', level: 3 },
  { id: 'quick-start', text: 'Quick Start', level: 2 },
  { id: 'basic-usage', text: 'Basic Usage', level: 3 },
  { id: 'advanced', text: 'Advanced', level: 2 },
]

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    docs: {
      description: {
        component:
          'Section breadcrumb with optional table-of-contents dropdown for page headings.',
      },
    },
    tanstack: {
      router: {},
    },
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    section: 'Getting Started',
    headings: sampleHeadings,
  },
}

export const WithSectionLink: Story = {
  args: {
    section: 'Getting Started',
    sectionTo: '/docs',
    headings: sampleHeadings,
  },
}

export const WithoutHeadings: Story = {
  args: {
    section: 'Blog',
  },
}

export const SingleHeading: Story = {
  args: {
    section: 'API Reference',
    headings: [{ id: 'overview', text: 'Overview', level: 2 }],
  },
}
