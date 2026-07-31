import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch.js';

describe('Switch', () => {
  it('renders with label', () => {
    render(<Switch label="Dark mode" />);
    expect(screen.getByRole('switch', { name: 'Dark mode' })).toBeInTheDocument();
  });

  it('calls onChange when toggled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Switch label="Alerts" onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(expect.any(Object), true);
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Switch label="Locked" disabled onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
