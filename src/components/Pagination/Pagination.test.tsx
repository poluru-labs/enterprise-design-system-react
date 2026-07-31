import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination.js';

describe('Pagination', () => {
  it('renders page buttons', () => {
    render(<Pagination page={1} total={50} pageSize={10} />);
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Page 5' })).toBeInTheDocument();
  });

  it('calls onChange when page clicked', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Pagination page={1} total={50} pageSize={10} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Page 2' }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('disables prev on first page', () => {
    render(<Pagination page={1} total={50} pageSize={10} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  });

  it('calls onChange for next and previous navigation', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Pagination page={2} total={50} pageSize={10} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole('button', { name: 'Previous page' }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('does not call onChange when clicking current page', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Pagination page={2} total={50} pageSize={10} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: 'Page 2' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders ellipsis for large page counts', () => {
    render(<Pagination page={5} total={200} pageSize={10} siblingCount={1} />);
    expect(screen.getAllByText('…').length).toBeGreaterThan(0);
  });

  it('disables navigation when total is zero', () => {
    render(<Pagination page={1} total={0} pageSize={10} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
    expect(screen.queryByRole('button', { name: 'Page 1' })).not.toBeInTheDocument();
  });
});

