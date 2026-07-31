import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuItem } from './MenuItem.js';

describe('MenuItem', () => {
  it('renders label text', () => {
    render(<MenuItem label="Edit" />);
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
  });

  it('calls onSelect with value and label', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(<MenuItem label="Delete" value="delete" onSelect={onSelect} />);
    await user.click(screen.getByRole('menuitem'));

    expect(onSelect).toHaveBeenCalledWith({ value: 'delete', label: 'Delete' });
  });

  it('does not call onSelect when disabled', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(<MenuItem label="Disabled" disabled onSelect={onSelect} />);
    await user.click(screen.getByRole('menuitem'));

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('applies danger styling class', () => {
    render(<MenuItem label="Remove" danger />);
    expect(screen.getByRole('menuitem')).toHaveClass('danger');
  });
});
