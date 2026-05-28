import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect, waitFor } from 'storybook/test'
import { Navbar } from './Navbar'
import preview from '../../.storybook/preview'

// Navbar uses TanStack Router hooks (`useMatches`, `useLocation`) and renders
// `<Link>`s, so the framework's synthetic router has to be present even for
// this isolated component story. We pin it to `/` for a neutral context.
const meta = preview.meta({
  component: Navbar,
  parameters: {
    tanstack: {
      router: {
        path: '/',
      },
    },
  },
  args: {
    children: (
      <main className="p-8">
        <p className="text-sm text-gray-500">
          Story content. The Navbar renders the bar at the top and the
          flyout/mobile menu when toggled.
        </p>
      </main>
    ),
  },
  tags: ['ai-generated'],
})

export default meta
type Story = StoryObj<typeof meta>

export const Default = meta.story({
  play: async ({ canvas }) => {
    await waitFor(async () => {
      await expect(
        canvas.getByRole('link', { name: /tanstack/i }),
      ).toBeVisible()
    })

    // Mobile menu toggle is rendered with an "Open Menu" aria-label.
    await expect(
      canvas.getByRole('button', { name: /open menu/i }),
    ).toBeVisible()

    // Login fallback is rendered until the lazy auth controls hydrate.
    await expect(canvas.getByRole('link', { name: /log in/i })).toBeVisible()
  },
})

export const ToggleMobileMenu = meta.story({
  play: async ({ canvas, userEvent }) => {
    const menuButton = await waitFor(() =>
      canvas.getByRole('button', { name: /open menu/i }),
    )
    await userEvent.click(menuButton)

    // The flyout duplicates the items list, so a library link like "Query"
    // appears more than once in the DOM once the menu is open.
    await waitFor(async () => {
      const queryLinks = canvas.getAllByRole('link', { name: /^query$/i })
      await expect(queryLinks.length).toBeGreaterThan(1)
    })

    // Toggling the same button closes the menu again.
    await userEvent.click(menuButton)
  },
})

export const SocialLinks = meta.story({
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
})
