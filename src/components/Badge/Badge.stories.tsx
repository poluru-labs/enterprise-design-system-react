import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge.js';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: 'Active',
    variant: 'success',
  },
};

export const Solid: Story = {
  args: {
    label: 'Pro',
    variant: 'brand',
    soft: false,
    pill: true,
  },
};
