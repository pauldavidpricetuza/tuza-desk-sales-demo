import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabList, Tab, TabPanel } from '../ui/Tabs/Tabs'

const meta = {
  title: 'Enterprise/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs selectedKey="overview">
      <TabList>
        <Tab id="overview">Overview</Tab>
        <Tab id="details">Details</Tab>
        <Tab id="history">History</Tab>
      </TabList>
      <TabPanel id="overview">Overview content</TabPanel>
      <TabPanel id="details">Details content</TabPanel>
      <TabPanel id="history">History content</TabPanel>
    </Tabs>
  ),
}
