import type { Meta, StoryObj } from '@storybook/react';
import { EDS_ICON_NAMES } from '../../icons/names.js';
import { Icon } from './Icon.js';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: EDS_ICON_NAMES },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    decorative: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    name: 'search',
    size: 'md',
    decorative: true,
    label: '',
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const Accessible: Story = {
  args: { name: 'info', decorative: false, label: 'Information' },
};
