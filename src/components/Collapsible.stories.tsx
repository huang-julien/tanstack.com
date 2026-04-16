import type { Meta, StoryObj } from '@storybook/tanstack-react'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './Collapsible'
import { ChevronDown } from 'lucide-react'

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: {
    docs: {
      description: {
        component:
          'Expandable section with controlled, uncontrolled, and render-prop modes.',
      },
    },
  },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <CollapsibleTrigger className="flex items-center gap-2 px-4 py-2 w-full text-left font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <ChevronDown className="w-4 h-4" />
          Click to toggle
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
            This is the collapsible content. It can contain any elements.
          </div>
        </CollapsibleContent>
      </>
    ),
  },
}

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
    children: (
      <>
        <CollapsibleTrigger className="flex items-center gap-2 px-4 py-2 w-full text-left font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <ChevronDown className="w-4 h-4" />
          Already Open
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
            This content is visible by default.
          </div>
        </CollapsibleContent>
      </>
    ),
  },
}

export const WithRenderProps: Story = {
  args: {
    children: ({ open }: { open: boolean }) => (
      <>
        <CollapsibleTrigger className="flex items-center gap-2 px-4 py-2 w-full text-left font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <ChevronDown
            className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          />
          {open ? 'Collapse' : 'Expand'}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
            The trigger label changes based on state.
          </div>
        </CollapsibleContent>
      </>
    ),
  },
}

export const Multiple: Story = {
  args: { children: 'Multiple sections' },
  render: () => (
    <div className="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg">
      {['Section 1', 'Section 2', 'Section 3'].map((section) => (
        <Collapsible key={section}>
          <CollapsibleTrigger className="flex items-center gap-2 px-4 py-3 w-full text-left font-medium hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <ChevronDown className="w-4 h-4" />
            {section}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
              Content for {section}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  ),
}
