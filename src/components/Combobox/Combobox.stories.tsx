import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from './Combobox.js';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  args: {
    label: 'City',
    placeholder: 'Search cities…',
    options: [
      { label: 'New York', value: 'ny' },
      { label: 'Los Angeles', value: 'la' },
      { label: 'Chicago', value: 'chi' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {};
