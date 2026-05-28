import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect, waitFor } from 'storybook/test'
import { Tooltip } from './Tooltip'
import preview from '../../.storybook/preview'

const meta = preview.meta({
  component: Tooltip,
  tags: ['ai-generated'],
})

export default meta
type Story = StoryObj<typeof meta>

export const HoverToReveal = meta.story({
  args: {
    content: 'Copy to clipboard',
    delayDuration: 0,
    children: (
      <button type="button" className="px-3 py-2 rounded bg-gray-100">
        Copy
      </button>
    ),
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /copy/i })
    await userEvent.hover(trigger)

    // Radix portals tooltip content to document.body, so query the owning doc.
    await waitFor(async () => {
      const tooltip =
        canvasElement.ownerDocument.body.querySelector('[role="tooltip"]')
      await expect(tooltip).not.toBeNull()
      await expect(tooltip!.textContent).toMatch(/copy to clipboard/i)
    })
  },
})

export const EmptyContentRendersChildOnly = meta.story({
  args: {
    content: null,
    children: <span data-testid="bare">No tooltip wrapper</span>,
  },
  play: async ({ canvas }) => {
    // When content is falsy, Tooltip short-circuits to children — no Radix
    // provider/trigger should be wrapping the text.
    const child = canvas.getByTestId('bare')
    await expect(child).toBeVisible()
    await expect(child.tagName.toLowerCase()).toBe('span')
  },
})
