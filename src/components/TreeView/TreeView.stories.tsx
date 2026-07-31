import type { Meta, StoryObj } from '@storybook/react';
import { TreeView } from './TreeView.js';

const meta: Meta<typeof TreeView> = {
  title: 'Components/TreeView',
  component: TreeView,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TreeView>;

export const Default: Story = {
  args: {
    items: [
      { id: 'docs', label: 'Documents', children: [{ id: 'report', label: 'Report.pdf' }] },
      { id: 'images', label: 'Images' },
    ],
    expandedIds: { docs: true },
    selectedId: 'report',
  },
};
