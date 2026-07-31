import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from './MenuItem.js';

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {
  args: {
    label: 'Menu item',
  },
};

export const Danger: Story = {
  args: {
    label: 'Delete',
    danger: true,
  },
};
