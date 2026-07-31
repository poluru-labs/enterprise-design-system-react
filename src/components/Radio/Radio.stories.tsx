import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup.js';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    label: 'Notification preference',
    name: 'notifications',
    orientation: 'vertical',
    options: [
      { label: 'Email', value: 'email' },
      { label: 'SMS', value: 'sms' },
      { label: 'None', value: 'none' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
};
