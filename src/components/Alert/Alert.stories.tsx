import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert.js';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    message: 'Your session will expire in 5 minutes.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    message: 'Settings saved.',
    dismissible: true,
  },
};
