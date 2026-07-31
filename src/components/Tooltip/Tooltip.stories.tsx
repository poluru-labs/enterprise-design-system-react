import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip.js';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'Additional context for this action',
    children: <button type="button">Hover or focus</button>,
  },
};
