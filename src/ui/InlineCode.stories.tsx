import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { InlineCode } from './InlineCode'

const meta = {
  title: 'UI/InlineCode',
  component: InlineCode,
  parameters: {
    docs: {
      description: {
        component: 'Inline code styling for embedding code snippets in text.',
      },
    },
  },
} satisfies Meta<typeof InlineCode>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'npm install @tanstack/react-query' },
}

export const InParagraph: Story = {
  render: () => (
    <p className="text-sm">
      Use the <InlineCode>useQuery</InlineCode> hook to fetch data and{' '}
      <InlineCode>useMutation</InlineCode> to modify it.
    </p>
  ),
}
