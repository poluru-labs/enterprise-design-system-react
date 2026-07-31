import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal.js';

describe('Modal', () => {
  it('renders dialog content when open', () => {
    render(
      <Modal open heading="Confirm action">
        Are you sure?
      </Modal>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Confirm action')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal open={false} heading="Hidden">
        Content
      </Modal>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when close button is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <Modal open onOpenChange={onOpenChange} heading="Test">
        Body
      </Modal>,
    );

    await user.click(screen.getByLabelText('Close dialog'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes on Escape when closeOnEscape is enabled', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <Modal open onOpenChange={onOpenChange} closeOnEscape>
        Body
      </Modal>,
    );

    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
