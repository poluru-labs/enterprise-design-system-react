import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SplitButton } from './SplitButton.js';
import { MenuItem } from '../MenuItem/MenuItem.js';

describe('SplitButton', () => {
  it('renders primary label', () => {
    render(<SplitButton label="Save" />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('calls onClick for primary action', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<SplitButton label="Publish" onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: 'Publish' }));

    expect(onClick).toHaveBeenCalled();
  });

  it('opens menu and selects item', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(
      <SplitButton label="Export" onSelect={onSelect}>
        <MenuItem label="PDF" value="pdf" />
        <MenuItem label="CSV" value="csv" />
      </SplitButton>,
    );

    await user.click(screen.getByLabelText('More options'));
    await user.click(screen.getByRole('menuitem', { name: 'PDF' }));

    expect(onSelect).toHaveBeenCalledWith({ value: 'pdf', label: 'PDF' });
  });

  it('disables all actions when disabled', () => {
    render(
      <SplitButton label="Disabled" disabled>
        <MenuItem label="Option" />
      </SplitButton>,
    );

    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
    expect(screen.getByLabelText('More options')).toBeDisabled();
  });
});
