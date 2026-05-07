import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect, waitFor } from 'storybook/test'
import { Route } from '../routes/ethos'

// The /ethos route is a static marketing page (no loader), so the story just
// needs the framework to mount it inside its synthetic memory router.
const meta = {
  parameters: {
    tanstack: {
      router: {
        route: Route,
        path: '/ethos',
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
        canvas.getByRole('heading', { name: /tanstack ethos/i, level: 1 }),
      ).toBeVisible()
    })

    // Each Card section renders an h2 from the `sections` array.
    await expect(
      canvas.getByRole('heading', {
        name: /independently owned, unbiased by design/i,
      }),
    ).toBeVisible()
    await expect(
      canvas.getByRole('heading', { name: /a sustainable future/i }),
    ).toBeVisible()

    // Closing card links out to the Product Tenets page.
    const tenetsLink = canvas.getByRole('link', { name: /product tenets/i })
    await expect(tenetsLink).toHaveAttribute('href', '/tenets')
  },
}
