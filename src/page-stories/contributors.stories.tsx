import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect, waitFor } from 'storybook/test'
import { Route } from '../routes/$libraryId/$version.docs.contributors'

// Page-level story for the `/$libraryId/$version/docs/contributors` route.
// `@storybook/tanstack-react` spins up a synthetic memory router around the
// file route so `Route.useParams()` resolves with the params we supply below.
const meta = {
  parameters: {
    tanstack: {
      router: {
        route: Route,
        path: '/$libraryId/$version/docs/contributors',
        params: { libraryId: 'query', version: 'latest' },
      },
    },
  },
  tags: ['ai-generated'],
} satisfies Meta<typeof Route>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    // The route renders asynchronously inside the framework's memory router,
    // so wait for the route component to settle before asserting.
    await waitFor(async () => {
      await expect(
        canvas.getByRole('heading', { name: /maintainers and contributors/i }),
      ).toBeVisible()
    })
    await expect(
      canvas.getByRole('heading', { name: /all-time contributors/i }),
    ).toBeVisible()
  },
}

export const SwitchToCompactView: Story = {
  play: async ({ canvas, userEvent }) => {
    // Three view-mode toggles render at the top; clicking "Compact cards"
    // exercises the local useState branch in the route component.
    const compact = await waitFor(() => canvas.getByTitle('Compact cards'))
    await userEvent.click(compact)
    // Active button gets the bg-blue-500 / text-white treatment.
    await expect(compact.className).toMatch(/bg-blue-500/)
  },
}

export const SwitchToRowView: Story = {
  play: async ({ canvas, userEvent }) => {
    const row = await waitFor(() => canvas.getByTitle('Row cards'))
    await userEvent.click(row)
    await expect(row.className).toMatch(/bg-blue-500/)
  },
}
