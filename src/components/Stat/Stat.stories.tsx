import type { Meta, StoryObj } from '@storybook/react';
import { Stat } from './Stat.js';

const meta: Meta<typeof Stat> = {
  title: 'Components/Stat',
  component: Stat,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stat>;

export const Default: Story = {
  args: { label: 'Monthly revenue', value: '$48,200', trend: 'up', trendValue: '+12%', hint: 'vs last month' },
};
