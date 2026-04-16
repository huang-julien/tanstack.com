import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { Avatar } from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'User avatar with automatic fallback: image → initials → generic icon.',
      },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
  args: {
    image: 'https://avatars.githubusercontent.com/u/5580297?v=4',
    name: 'Tanner Linsley',
  },
}

export const WithInitials: Story = {
  args: { name: 'Tanner Linsley' },
}

export const WithEmail: Story = {
  args: { email: 'tanner@tanstack.com' },
}

export const Fallback: Story = {
  args: {},
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {(['2xs', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar key={size} name="Tanner Linsley" size={size} />
      ))}
    </div>
  ),
}

export const SizesWithImage: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {(['2xs', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar
          key={size}
          image="https://avatars.githubusercontent.com/u/5580297?v=4"
          name="Tanner Linsley"
          size={size}
        />
      ))}
    </div>
  ),
}

export const OAuthFallback: Story = {
  args: {
    oauthImage: 'https://avatars.githubusercontent.com/u/5580297?v=4',
    name: 'Tanner Linsley',
  },
}
