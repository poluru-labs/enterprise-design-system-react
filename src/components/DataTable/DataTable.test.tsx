import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable } from './DataTable.js';

const columns = [{ key: 'name', label: 'Name', sortable: true }, { key: 'role', label: 'Role' }];
const rows = [{ name: 'Ada', role: 'Engineer' }, { name: 'Grace', role: 'Scientist' }];

describe('DataTable', () => {
  it('renders rows', () => { render(<DataTable columns={columns} rows={rows} />); expect(screen.getByText('Ada')).toBeInTheDocument(); });
  it('shows empty state', () => { render(<DataTable columns={columns} rows={[]} />); expect(screen.getByText('No data')).toBeInTheDocument(); });
  it('fires onSort', async () => {
    const user = userEvent.setup(); const onSort = jest.fn();
    render(<DataTable columns={columns} rows={rows} sortable onSort={onSort} />);
    await user.click(screen.getByRole('button', { name: 'Sort by Name' }));
    expect(onSort).toHaveBeenCalledWith('name', 'asc');
  });
});
