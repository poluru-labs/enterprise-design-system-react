import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput.js';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  args: {
    label: 'Quantity',
    defaultValue: 1,
    min: 0,
    max: 10,
    step: 1,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {};
