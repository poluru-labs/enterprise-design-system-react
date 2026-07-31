import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker } from './DateRangePicker.js';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = { args: { label: 'Date range' } };
