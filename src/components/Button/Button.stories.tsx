import type { Meta, StoryObj } from '@storybook/react';
import { EDS_ICON_NAMES } from '../../icons/names.js';
import { Button } from './Button.js';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    icon: { control: 'select', options: ['', ...EDS_ICON_NAMES] },
    iconTrailing: { control: 'select', options: ['', ...EDS_ICON_NAMES] },
  },
  args: {
    children: 'Continue',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: { icon: 'plus', children: 'Add item' },
};

export const IconOnly: Story = {
  args: { icon: 'settings', iconOnly: true, accessibleLabel: 'Settings', children: '' },
};
