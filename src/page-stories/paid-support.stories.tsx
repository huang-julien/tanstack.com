import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect, waitFor } from 'storybook/test'
import { Route } from '../routes/paid-support'

// Static marketing route — no loader to mock. The interactive bit is the
// view-mode toggle (compact / full / row) for maintainer cards.
const meta = {
  parameters: {
    tanstack: {
      router: {
        route: Route,
        path: '/paid-support',
      },
    },
  },
  tags: ['ai-generated'],
} satisfies Meta<typeof Route>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(async () => {
      await expect(
        canvas.getByRole('heading', { name: /enterprise support/i, level: 1 }),
      ).toBeVisible()
    })

    // Compact is the initial view — its toggle should be the active one.
    const compact = canvas.getByTitle('Compact cards')
    await expect(compact.className).toMatch(/bg-blue-500/)

    // Contact CTA points at the support mailbox.
    const contact = canvas.getByRole('link', { name: /contact support team/i })
    await expect(contact).toHaveAttribute(
      'href',
      expect.stringContaining('mailto:support@tanstack.com'),
    )
  },
}

export const SwitchToFullView: Story = {
  play: async ({ canvas, userEvent }) => {
    const full = await waitFor(() => canvas.getByTitle('Full cards'))
    await userEvent.click(full)
    await expect(full.className).toMatch(/bg-blue-500/)
  },
}

export const SwitchToRowView: Story = {
  play: async ({ canvas, userEvent }) => {
    const row = await waitFor(() => canvas.getByTitle('Row cards'))
    await userEvent.click(row)
    await expect(row.className).toMatch(/bg-blue-500/)
  },
}
