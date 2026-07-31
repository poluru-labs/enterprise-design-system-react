import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar.js';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {
  args: {
    name: 'Subrahmanyam Poluru',
    size: 'lg',
  },
};

export const Image: Story = {
  args: {
    name: 'Subrahmanyam Poluru',
    src: 'https://i.pravatar.cc/80?img=12',
    alt: 'Subrahmanyam Poluru',
  },
};
