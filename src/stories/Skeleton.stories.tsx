import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton, SkeletonText } from '../ui/Skeleton/Skeleton'

const meta = {
  title: 'Enterprise/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { width: 200, height: 20 },
}

export const Card: Story = {
  args: { width: 300, height: 120 },
}

export const Text: Story = {
  render: () => <SkeletonText text="Loading content..." />,
}
