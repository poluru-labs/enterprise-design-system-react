import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from './Autocomplete.js';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  args: {
    label: 'Fruit',
    placeholder: 'Start typing…',
    suggestions: ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry'],
    minChars: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {};
