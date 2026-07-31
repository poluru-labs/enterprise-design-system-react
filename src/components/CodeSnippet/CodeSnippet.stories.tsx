import type { Meta, StoryObj } from '@storybook/react';
import { CodeSnippet } from './CodeSnippet.js';

const meta: Meta<typeof CodeSnippet> = {
  title: 'Components/CodeSnippet',
  component: CodeSnippet,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CodeSnippet>;

export const Default: Story = {
  args: {
    code: '<eds-button variant="primary">Save</eds-button>',
    language: 'html',
  },
};
