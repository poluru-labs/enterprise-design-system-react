import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Popover } from './Popover.js';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Popover>;

function PopoverDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      heading="Account info"
      trigger={<button type="button">Show info</button>}
    >
      Signed in as admin@example.com
    </Popover>
  );
}

export const Default: Story = {
  render: () => <PopoverDemo />,
};
