import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProvider, showToast } from './Toast.js';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Declarative: Story = {
  args: {
    title: 'Changes saved',
    description: 'Your profile was updated successfully.',
    variant: 'success',
  },
};

export const Imperative: Story = {
  render: () => (
    <button
      type="button"
      onClick={() =>
        showToast({
          title: 'File uploaded',
          description: 'report.pdf is ready to review.',
          variant: 'info',
        })
      }
    >
      Show toast
    </button>
  ),
};
