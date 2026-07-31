import type { Meta, StoryObj } from '@storybook/react';
import { Tab, Tabs } from './Tabs.js';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultSelectedIndex={0}>
      <Tab label="Overview">Overview content</Tab>
      <Tab label="Details">Details content</Tab>
      <Tab label="Settings" disabled>
        Settings content
      </Tab>
    </Tabs>
  ),
};
