import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './Search.js';

describe('Search', () => {
  it('renders search input', () => {
    render(<Search placeholder="Find items" />);
    expect(screen.getByPlaceholderText('Find items')).toBeInTheDocument();
  });

  it('shows clear button when value is present', () => {
    render(<Search value="query" onChange={() => {}} clearable />);
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
  });

  it('calls onClear and onChange when cleared', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onClear = jest.fn();
    render(<Search value="query" onChange={onChange} onClear={onClear} clearable />);
    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(onClear).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(expect.any(Object), '');
  });
});
