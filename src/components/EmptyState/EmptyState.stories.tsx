import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState.js';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    heading: 'No projects yet',
    description: 'Create your first project to start tracking work.',
    actions: <button type="button">Create project</button>,
  },
};
