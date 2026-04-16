import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { Select, type SelectOption } from './Select'
import reactLogo from '~/images/react-logo.svg'
import vueLogo from '~/images/vue-logo.svg'
import solidLogo from '~/images/solid-logo.svg'
import svelteLogo from '~/images/svelte-logo.svg'
import angularLogo from '~/images/angular-logo.svg'

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'Custom select dropdown with optional logo icons next to each option.',
      },
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const frameworkOptions: SelectOption[] = [
  { label: 'React', value: 'react', logo: reactLogo },
  { label: 'Vue', value: 'vue', logo: vueLogo },
  { label: 'Solid', value: 'solid', logo: solidLogo },
  { label: 'Svelte', value: 'svelte', logo: svelteLogo },
  { label: 'Angular', value: 'angular', logo: angularLogo },
]

const plainOptions: SelectOption[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
]

export const Default: Story = {
  args: {
    selected: 'react',
    available: frameworkOptions,
    onSelect: () => {},
    className: 'max-w-xs',
  },
}

export const WithoutLogos: Story = {
  args: {
    selected: 'a',
    available: plainOptions,
    onSelect: () => {},
    className: 'max-w-xs',
  },
}

export const Interactive: Story = {
  args: { selected: 'react', available: frameworkOptions, onSelect: () => {} },
  render: () => {
    const [selected, setSelected] = useState('react')
    return (
      <div className="max-w-xs">
        <Select
          selected={selected}
          available={frameworkOptions}
          onSelect={(option) => setSelected(option.value)}
        />
        <p className="mt-2 text-sm text-gray-500">Selected: {selected}</p>
      </div>
    )
  },
}
