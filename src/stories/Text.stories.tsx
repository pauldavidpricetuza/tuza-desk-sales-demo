import type { Meta, StoryObj } from '@storybook/react'
import { Text } from '../ui/Text/Text'

const meta = {
  title: 'Enterprise/Text',
  component: Text,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    font: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'body1', 'body2', 'caption', 'label'],
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'span', 'p'],
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: { font: 'h1', as: 'h1', children: 'Heading 1' },
}

export const H2: Story = {
  args: { font: 'h2', as: 'h2', children: 'Heading 2' },
}

export const H3: Story = {
  args: { font: 'h3', as: 'h3', children: 'Heading 3' },
}

export const Body1: Story = {
  args: { font: 'body1', children: 'Body 1 — the quick brown fox jumps over the lazy dog' },
}

export const Body2: Story = {
  args: { font: 'body2', children: 'Body 2 — the quick brown fox jumps over the lazy dog' },
}

export const Caption: Story = {
  args: { font: 'caption', children: 'Caption text' },
}
