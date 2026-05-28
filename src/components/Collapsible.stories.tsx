import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './Collapsible'
import preview from '../../.storybook/preview'

const meta = preview.meta({
  component: Collapsible,
  tags: ['ai-generated'],
})

export default meta

export const ClosedByDefault = meta.story({
  args: {
    className: 'max-w-sm',
    children: (
      <>
        <CollapsibleTrigger className="text-sm font-medium">
          Show changelog
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p data-testid="changelog" className="pt-2 text-sm">
            v10 introduces a new Storybook framework.
          </p>
        </CollapsibleContent>
      </>
    ),
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /show changelog/i })
    await expect(trigger).toBeVisible()
    // Content exists in the DOM but the grid is collapsed (rows = 0fr).
    const content = canvas.getByTestId('changelog')
    await expect(content).toBeInTheDocument()
  },
})

export const OpensOnClick = meta.story({
  args: {
    className: 'max-w-sm',
    children: (
      <>
        <CollapsibleTrigger className="text-sm font-medium">
          Show details
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p data-testid="details" className="pt-2 text-sm">
            Hidden details revealed.
          </p>
        </CollapsibleContent>
      </>
    ),
  },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /show details/i })
    await userEvent.click(trigger)

    // After clicking the trigger, the inner grid container should expand
    // (grid-rows-[1fr]) — the source of truth for the open state.
    const expanded = canvas.getByTestId('details').closest('[data-collapsible]')
    await expect(expanded?.querySelector('.grid')?.className).toMatch(
      /grid-rows-\[1fr\]/,
    )
  },
})

export const DefaultOpen = meta.story({
  args: {
    defaultOpen: true,
    className: 'max-w-sm',
    children: (
      <>
        <CollapsibleTrigger className="text-sm font-medium">
          Toggle
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p data-testid="prefilled" className="pt-2 text-sm">
            Already visible.
          </p>
        </CollapsibleContent>
      </>
    ),
  },
  play: async ({ canvas }) => {
    const text = canvas.getByTestId('prefilled')
    await expect(text).toBeVisible()
    const grid = text.closest('[data-collapsible]')?.querySelector('.grid')
    await expect(grid?.className).toMatch(/grid-rows-\[1fr\]/)
  },
})
