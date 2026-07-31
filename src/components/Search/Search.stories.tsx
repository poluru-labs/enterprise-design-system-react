import type { Meta, StoryObj } from '@storybook/react';
import { Search } from './Search.js';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  tags: ['autodocs'],
  args: {
    placeholder: 'Search…',
    size: 'md',
    clearable: true,
    defaultValue: '',
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: 'enterprise' },
};
