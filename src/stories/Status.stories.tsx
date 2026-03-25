import type { Meta, StoryObj } from '@storybook/react'
import { Status } from '../ui/Status/Status'

const meta = {
  title: 'Enterprise/Status',
  component: Status,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['active', 'inactive', 'draft'] },
  },
} satisfies Meta<typeof Status>

export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = {
  args: { variant: 'active', text: 'Active' },
}

export const Inactive: Story = {
  args: { variant: 'inactive', text: 'Inactive' },
}

export const Draft: Story = {
  args: { variant: 'draft', text: 'Draft' },
}
