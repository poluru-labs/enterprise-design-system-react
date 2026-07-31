import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea.js';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    label: 'Description',
    placeholder: 'Enter details…',
    rows: 4,
    resize: 'vertical',
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Markdown is supported.' },
};
