import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DropdownMenu } from './DropdownMenu.js';
import { MenuItem } from '../MenuItem/MenuItem.js';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

function DropdownMenuDemo() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}
      trigger={<button type="button">Actions</button>}
    >
      <MenuItem label="Edit" value="edit" />
      <MenuItem label="Duplicate" value="duplicate" />
      <MenuItem label="Delete" value="delete" danger />
    </DropdownMenu>
  );
}

export const Default: Story = {
  render: () => <DropdownMenuDemo />,
};
