import type { Meta, StoryObj } from '@storybook/react';
import { SplitButton } from './SplitButton.js';
import { MenuItem } from '../MenuItem/MenuItem.js';

const meta: Meta<typeof SplitButton> = {
  title: 'Components/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SplitButton>;

export const Default: Story = {
  render: () => (
    <SplitButton label="Save draft">
      <MenuItem label="Save and publish" value="publish" />
      <MenuItem label="Save as template" value="template" />
    </SplitButton>
  ),
};
