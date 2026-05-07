import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect } from 'storybook/test'
import { FormInput } from './FormInput'

const meta = {
  component: FormInput,
  tags: ['ai-generated'],
} satisfies Meta<typeof FormInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'you@example.com',
    type: 'email',
    'aria-label': 'Email',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Email')
    await expect(input).toBeVisible()
    await expect(input).toHaveAttribute('type', 'email')
  },
}

export const TypingFlow: Story = {
  args: {
    placeholder: 'Search…',
    'aria-label': 'Search',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText<HTMLInputElement>('Search')
    await userEvent.type(input, 'tanstack')
    await expect(input.value).toBe('tanstack')
  },
}

export const PurpleFocusRing: Story = {
  args: {
    focusRing: 'purple',
    placeholder: 'API key',
    'aria-label': 'API key',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('API key')
    await expect(input.className).toMatch(/focus:ring-purple-500/)
  },
}
