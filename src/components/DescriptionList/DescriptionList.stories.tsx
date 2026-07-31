import type { Meta, StoryObj } from '@storybook/react';
import { DescriptionList } from './DescriptionList.js';

const meta: Meta<typeof DescriptionList> = {
  title: 'Components/DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DescriptionList>;

export const Default: Story = {
  args: {
    items: [
      { term: 'Customer', description: 'Acme Corp' },
      { term: 'Plan', description: 'Enterprise' },
      { term: 'Renewal', description: 'Jan 2027' },
    ],
    columns: 1,
  },
};
