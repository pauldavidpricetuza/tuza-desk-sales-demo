import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../ui/Button/Button'

const meta = {
  title: 'Enterprise/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'ghost'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary button' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary button' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive button' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost button' },
}

export const Disabled: Story = {
  args: { variant: 'primary', children: 'Disabled', isDisabled: true },
}

export const Loading: Story = {
  args: { variant: 'primary', children: 'Loading', loading: true },
}
