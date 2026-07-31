import type { Meta, StoryObj } from '@storybook/react';
import { PinInput } from './PinInput.js';

const meta: Meta<typeof PinInput> = {
  title: 'Components/PinInput',
  component: PinInput,
  tags: ['autodocs'],
  args: {
    label: 'Verification code',
    length: 6,
    type: 'number',
  },
};

export default meta;
type Story = StoryObj<typeof PinInput>;

export const Default: Story = {};
