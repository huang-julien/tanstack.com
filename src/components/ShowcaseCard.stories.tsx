import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { fn } from 'storybook/test'
import { ShowcaseCard } from './ShowcaseCard'
import type { Showcase } from '~/db/types'

const sampleShowcase: Showcase = {
  id: 'example-app',
  name: 'Example App',
  tagline: 'A beautiful application built with TanStack Router and Query',
  description: null,
  url: 'https://example.com',
  screenshotUrl: 'https://placehold.co/800x450/1a1a2e/ffffff?text=Example+App',
  logoUrl: 'https://placehold.co/80x80/6366f1/ffffff?text=E',
  sourceUrl: 'https://github.com/example/app',
  libraries: ['router', 'query', 'form'],
  useCases: ['saas'],
  isFeatured: false,
  status: 'approved',
  moderatedBy: null,
  moderatedAt: null,
  moderationNote: null,
  trancoRank: null,
  trancoRankUpdatedAt: null,
  voteScore: 42,
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 'user-1',
}

const meta = {
  title: 'Components/ShowcaseCard',
  component: ShowcaseCard,
  parameters: {
    docs: {
      description: {
        component:
          'Showcase project card with screenshot, library tags, and voting.',
      },
    },
    tanstack: {
      router: {},
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ShowcaseCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    showcase: sampleShowcase,
  },
}

export const WithVoteControls: Story = {
  args: {
    showcase: sampleShowcase,
    onVote: fn(),
    currentUserVote: null,
  },
}

export const Upvoted: Story = {
  args: {
    showcase: sampleShowcase,
    onVote: fn(),
    currentUserVote: 1,
  },
}

export const Downvoted: Story = {
  args: {
    showcase: sampleShowcase,
    onVote: fn(),
    currentUserVote: -1,
  },
}

export const WithoutSourceUrl: Story = {
  args: {
    showcase: { ...sampleShowcase, sourceUrl: null },
  },
}

export const WithoutLogo: Story = {
  args: {
    showcase: { ...sampleShowcase, logoUrl: null },
  },
}

export const ManyLibraries: Story = {
  args: {
    showcase: {
      ...sampleShowcase,
      libraries: ['router', 'query', 'form', 'table', 'store'],
    },
  },
}

export const Interactive: Story = {
  args: {
    showcase: sampleShowcase,
    onVote: fn(),
    currentUserVote: null,
  },
  render: (args) => {
    const [vote, setVote] = useState<1 | -1 | null>(null)
    const [score, setScore] = useState(sampleShowcase.voteScore)
    return (
      <div className="max-w-sm">
        <ShowcaseCard
          {...args}
          showcase={{ ...sampleShowcase, voteScore: score }}
          currentUserVote={vote}
          onVote={(value) => {
            if (vote === value) {
              setVote(null)
              setScore((s) => s - value)
            } else {
              setScore((s) => s - (vote ?? 0) + value)
              setVote(value)
            }
          }}
        />
      </div>
    )
  },
}
