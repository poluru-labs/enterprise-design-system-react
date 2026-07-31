import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal.js';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Modal>;

function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open modal
      </button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        heading="Confirm action"
        footer={
          <>
            <button type="button" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" onClick={() => setOpen(false)}>
              Confirm
            </button>
          </>
        }
      >
        Are you sure you want to continue?
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo />,
};
