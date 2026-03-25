import type { Meta, StoryObj } from '@storybook/react'
import { SearchInput } from '../ui/SearchInput/SearchInput'

const meta = {
  title: 'Enterprise/SearchInput',
  component: SearchInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
