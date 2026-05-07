import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect, waitFor } from 'storybook/test'
import { Route } from '../routes/ethos'

// Navbar lives in __root so any page story renders it. We pin the page to a
// simple, loader-less route (`/ethos`) so this story stays focused on the
// navbar's own behavior — branding, search, theme toggle, mobile menu — and
// not on whatever the underlying page is doing.
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
    // Brand link is the always-visible anchor on the left.
    await waitFor(async () => {
      await expect(
        canvas.getByRole('link', { name: /tanstack/i }),
      ).toBeVisible()
    })

    // The mobile menu toggle is rendered with an aria-label of "Open Menu".
    await expect(
      canvas.getByRole('button', { name: /open menu/i }),
    ).toBeVisible()

    // Theme toggle and login fallback both render in the right cluster.
    await expect(canvas.getByRole('link', { name: /log in/i })).toBeVisible()
  },
}

export const ToggleMobileMenu: Story = {
  play: async ({ canvas, userEvent }) => {
    const menuButton = await waitFor(() =>
      canvas.getByRole('button', { name: /open menu/i }),
    )
    await userEvent.click(menuButton)

    // Once open, the navbar duplicates the items list into a flyout — so a
    // library link like "Query" appears more than once in the DOM.
    await waitFor(async () => {
      const queryLinks = canvas.getAllByRole('link', { name: /^query$/i })
      await expect(queryLinks.length).toBeGreaterThan(1)
    })

    // Clicking the menu button again toggles it closed.
    await userEvent.click(menuButton)
  },
}

export const SocialLinks: Story = {
  play: async ({ canvas }) => {
    await waitFor(async () => {
      await expect(
        canvas.getByRole('link', { name: /follow tanstack on github/i }),
      ).toHaveAttribute('href', 'https://github.com/tanstack')
    })
    await expect(
      canvas.getByRole('link', { name: /follow tanstack on x\.com/i }),
    ).toHaveAttribute('href', 'https://x.com/tan_stack')
    await expect(
      canvas.getByRole('link', { name: /join tanstack discord/i }),
    ).toHaveAttribute('href', 'https://tlinz.com/discord')
  },
}
