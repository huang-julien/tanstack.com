import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import { DocsCalloutBytes } from './DocsCalloutBytes'
import preview from '../../.storybook/preview'

const meta = preview.meta({
  component: DocsCalloutBytes,
  tags: ['ai-generated'],
})

export default meta
type Story = StoryObj<typeof meta>

export const Default = meta.story({
  args: {
    className: 'max-w-xs',
  },
  play: async ({ canvas }) => {
    // The callout has a discoverable heading and a working email field.
    await expect(
      canvas.getByRole('heading', { name: /subscribe to bytes/i }),
    ).toBeVisible()

    // BytesForm exposes an email input — proves the form wiring rendered
    // through the ToastProvider decorator without throwing.
    const email = canvas.getByPlaceholderText<HTMLInputElement>(/your email/i)
    await expect(email).toBeVisible()
    await expect(email.type).toBe('email')
  },
})

export const TypingEmail = meta.story({
  args: {
    className: 'max-w-xs',
  },
  play: async ({ canvas, userEvent }) => {
    const email = canvas.getByPlaceholderText<HTMLInputElement>(/your email/i)
    await userEvent.type(email, 'reader@example.com')
    await expect(email.value).toBe('reader@example.com')
  },
})
