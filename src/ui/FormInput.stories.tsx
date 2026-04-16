import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { FormInput } from './FormInput'

const meta = {
  title: 'UI/FormInput',
  component: FormInput,
  args: {
    placeholder: 'Enter text...',
  },
  parameters: {
    docs: {
      description: {
        component: 'Styled text input with configurable focus ring color.',
      },
    },
  },
} satisfies Meta<typeof FormInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: { defaultValue: 'Hello world' },
}

export const FocusRings: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <FormInput placeholder="Blue ring (default)" focusRing="blue" />
      <FormInput placeholder="Orange ring" focusRing="orange" />
      <FormInput placeholder="Purple ring" focusRing="purple" />
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Disabled input' },
}

export const Password: Story = {
  args: { type: 'password', placeholder: 'Enter password...' },
}
