import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input.js';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" placeholder="you@example.com" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Input label="Name" onChange={onChange} />);
    await user.type(screen.getByLabelText('Name'), 'Ada');
    expect(onChange).toHaveBeenCalled();
  });

  it('shows error message when invalid', () => {
    render(<Input label="Email" invalid errorMessage="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables the input when disabled', () => {
    render(<Input label="Email" disabled />);
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('renders leading and trailing icons', () => {
    render(<Input label="Search" icon="search" iconTrailing="settings" size="sm" />);
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  it('shows hint when valid', () => {
    render(<Input label="Email" hint="Work email only" />);
    expect(screen.getByText('Work email only')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-describedby', expect.stringContaining('-hint'));
  });
});
