import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import { DocsCalloutQueryGG } from './DocsCalloutQueryGG'
import preview from '../../.storybook/preview'

const meta = preview.meta({
  component: DocsCalloutQueryGG,
  tags: ['ai-generated'],
})

export default meta
type Story = StoryObj<typeof meta>

export const Default = meta.story({
  play: async ({ canvas }) => {
    // The PPP fetch runs against a real edge worker. In the story sandbox it
    // either fails (caught) or succeeds — either way the callout shell must
    // render with its heading, link, and CTA.
    await expect(
      canvas.getByRole('heading', { name: /want to skip the docs/i }),
    ).toBeVisible()

    const link = canvas.getByRole('link')
    await expect(link).toHaveAttribute('href', 'https://query.gg?s=tanstack')
    await expect(link).toHaveAttribute('target', '_blank')

    // The CTA button is always present; its label varies based on whether
    // PPP resolved to a discount or not.
    const cta = canvas.getByRole('button')
    await expect(cta).toBeVisible()
    await expect(cta.textContent).toMatch(/learn more|get \d+% off/i)
  },
})
