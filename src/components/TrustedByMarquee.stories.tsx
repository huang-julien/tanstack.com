import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { TrustedByMarquee } from './TrustedByMarquee'

const meta = {
  title: 'Components/TrustedByMarquee',
  component: TrustedByMarquee,
  parameters: {
    docs: {
      description: {
        component:
          'Auto-scrolling marquee of brand logos with configurable speed.',
      },
    },
  },
} satisfies Meta<typeof TrustedByMarquee>

export default meta
type Story = StoryObj<typeof meta>

const brands = [
  'Google',
  'Amazon',
  'Apple',
  'Microsoft',
  'Walmart',
  'Uber',
  'Salesforce',
  'Cisco',
  'Intuit',
  'HP',
  'Docusign',
  'TicketMaster',
  'Nordstrom',
  'Yahoo!',
]

export const Default: Story = {
  args: { brands },
}

export const Slow: Story = {
  args: { brands, speed: 60 },
}

export const Fast: Story = {
  args: { brands, speed: 300 },
}

export const FewBrands: Story = {
  args: {
    brands: ['Google', 'Microsoft', 'Apple'],
  },
}
