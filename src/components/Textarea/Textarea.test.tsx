import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './Textarea.js';

describe('Textarea', () => {
  it('renders with label', () => {
    render(<Textarea label="Notes" />);
    expect(screen.getByLabelText('Notes')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Textarea label="Notes" onChange={onChange} />);
    await user.type(screen.getByLabelText('Notes'), 'Hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('shows hint text', () => {
    render(<Textarea label="Notes" hint="Optional details" />);
    expect(screen.getByText('Optional details')).toBeInTheDocument();
  });
});
