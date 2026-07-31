import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input.js';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'email',
    size: 'md',
    disabled: false,
    invalid: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'We will never share your email.' },
};

export const Invalid: Story = {
  args: { invalid: true, errorMessage: 'Enter a valid email address.' },
};
