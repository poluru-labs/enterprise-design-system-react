import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from './TimePicker.js';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  args: {
    label: 'Meeting time',
    hint: 'Uses 24-hour HH:MM format',
    defaultValue: '09:00',
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {};
