import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimePicker } from './TimePicker.js';

describe('TimePicker', () => {
  it('renders with label', () => {
    render(<TimePicker label="Start time" />);
    expect(screen.getByLabelText('Start time')).toHaveAttribute('type', 'time');
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<TimePicker label="Start time" onChange={onChange} />);
    await user.type(screen.getByLabelText('Start time'), '09:30');
    expect(onChange).toHaveBeenCalled();
  });

  it('shows hint text', () => {
    render(<TimePicker label="Start time" hint="24-hour format" />);
    expect(screen.getByText('24-hour format')).toBeInTheDocument();
  });
});
