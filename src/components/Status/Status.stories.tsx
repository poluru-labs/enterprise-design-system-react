import type { Meta, StoryObj } from '@storybook/react';
import { Status } from './Status.js';

const meta: Meta<typeof Status> = {
  title: 'Components/Status',
  component: Status,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Status>;

export const Default: Story = { args: { label: 'Active', variant: 'success' } };
