import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card.js';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    header: 'Project overview',
    children: 'Track milestones, owners, and delivery status in one place.',
    footer: 'Last updated 2 hours ago',
    elevated: true,
  },
};
