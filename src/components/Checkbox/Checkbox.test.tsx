import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox.js';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('calls onChange when toggled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Checkbox label="Subscribe" onChange={onChange} />);
    await user.click(screen.getByLabelText('Subscribe'));
    expect(onChange).toHaveBeenCalledWith(expect.any(Object), true);
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Checkbox label="Locked" disabled onChange={onChange} />);
    await user.click(screen.getByLabelText('Locked'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
