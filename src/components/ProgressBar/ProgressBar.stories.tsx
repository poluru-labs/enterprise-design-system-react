import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar.js';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = { args: { value: 60, label: 'Upload', showValue: true } };
export const Indeterminate: Story = { args: { indeterminate: true, label: 'Loading' } };
