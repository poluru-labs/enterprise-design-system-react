import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NumberInput } from './NumberInput.js';

describe('NumberInput', () => {
  it('renders with label and steppers', () => {
    render(<NumberInput label="Quantity" defaultValue={1} />);
    expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Increase value' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decrease value' })).toBeInTheDocument();
  });

  it('increments value via stepper', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<NumberInput label="Quantity" value={1} min={0} max={10} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Increase value' }));
    expect(onChange).toHaveBeenCalledWith(expect.any(Object), 2);
  });

  it('disables decrement at minimum', () => {
    render(<NumberInput label="Quantity" value={0} min={0} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Decrease value' })).toBeDisabled();
  });

  it('decrements value via stepper', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<NumberInput label="Quantity" value={5} min={0} max={10} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Decrease value' }));
    expect(onChange).toHaveBeenCalledWith(expect.any(Object), 4);
  });

  it('calls onInput and onChange when typing', () => {
    const onInput = jest.fn();
    const onChange = jest.fn();
    render(
      <NumberInput label="Quantity" defaultValue={1} min={0} max={10} onInput={onInput} onChange={onChange} />,
    );

    const input = screen.getByLabelText('Quantity');
    fireEvent.input(input, { target: { value: '7' } });
    expect(onInput).toHaveBeenCalledWith(expect.any(Object), 7);

    fireEvent.change(input, { target: { value: '8' } });
    expect(onChange).toHaveBeenCalledWith(expect.any(Object), 8);
  });

  it('shows hint when provided', () => {
    render(<NumberInput label="Quantity" hint="Enter a quantity" defaultValue={1} />);
    expect(screen.getByText('Enter a quantity')).toBeInTheDocument();
  });
});
