import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload.js';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    label: 'Upload documents',
    hint: 'PDF, DOCX up to 10MB',
    multiple: true,
  },
};
