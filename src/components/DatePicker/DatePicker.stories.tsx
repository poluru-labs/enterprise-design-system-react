import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker.js';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: { label: 'Start date', hint: 'Select a date in ISO format' },
};
