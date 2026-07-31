import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PinInput } from './PinInput.js';

describe('PinInput', () => {
  it('renders the configured number of cells', () => {
    render(<PinInput length={4} label="Code" />);
    expect(screen.getByLabelText('Digit 1 of 4')).toBeInTheDocument();
    expect(screen.getByLabelText('Digit 4 of 4')).toBeInTheDocument();
  });

  it('calls onChange as digits are entered', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<PinInput length={4} onChange={onChange} />);
    await user.type(screen.getByLabelText('Digit 1 of 4'), '1');
    expect(onChange).toHaveBeenCalledWith('1');
  });

  it('calls onComplete when all digits are filled', async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    render(<PinInput length={4} onComplete={onComplete} />);
    await user.type(screen.getByLabelText('Digit 1 of 4'), '1234');
    expect(onComplete).toHaveBeenCalledWith('1234');
  });

  it('moves focus with arrow keys and backspace', async () => {
    const user = userEvent.setup();
    render(<PinInput length={4} defaultValue="1" />);

    const second = screen.getByLabelText('Digit 2 of 4');
    second.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByLabelText('Digit 3 of 4')).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    expect(second).toHaveFocus();

    await user.keyboard('{Backspace}');
    expect(screen.getByLabelText('Digit 1 of 4')).toHaveFocus();
  });

  it('pastes digits into cells', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<PinInput length={4} onChange={onChange} />);

    await user.click(screen.getByLabelText('Digit 1 of 4'));
    await user.paste('9876');

    expect(onChange).toHaveBeenCalledWith('9876');
  });

  it('rejects non-numeric input for number type', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<PinInput length={4} type="number" onChange={onChange} />);

    await user.type(screen.getByLabelText('Digit 1 of 4'), 'a');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('rejects non-numeric paste for number type', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<PinInput length={4} type="number" onChange={onChange} />);

    await user.click(screen.getByLabelText('Digit 1 of 4'));
    await user.paste('12ab');

    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows error message when invalid', () => {
    render(<PinInput length={4} invalid errorMessage="Invalid code" label="Code" />);
    expect(screen.getByText('Invalid code')).toBeInTheDocument();
  });
});
