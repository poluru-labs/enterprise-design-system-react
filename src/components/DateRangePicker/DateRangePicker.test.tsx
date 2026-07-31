import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { formatDisplayDate } from '../../utils/date-utils.js';
import { DateRangePicker } from './DateRangePicker.js';

describe('DateRangePicker', () => {
  it('renders with placeholder', () => {
    render(<DateRangePicker label="Range" />);
    expect(screen.getByLabelText('Range')).toHaveAttribute('placeholder', 'Select date range');
  });

  it('opens calendar popover', async () => {
    const user = userEvent.setup();
    render(<DateRangePicker label="Range" />);
    await user.click(screen.getByLabelText('Range'));
    expect(screen.getByRole('dialog', { name: 'Choose date range' })).toBeInTheDocument();
  });

  it('calls onChange after selecting two dates', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<DateRangePicker label="Range" onChange={onChange} />);
    await user.click(screen.getByLabelText('Range'));
    const days = screen.getAllByRole('gridcell').filter((btn) => !btn.disabled);
    await user.click(days[0]);
    await user.click(days[5]);
    expect(onChange).toHaveBeenCalledWith(expect.any(String), expect.any(String));
  });

  it('opens on keyboard and closes on Escape', async () => {
    const user = userEvent.setup();
    render(<DateRangePicker label="Range" />);
    const input = screen.getByLabelText('Range');
    input.focus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('dialog', { name: 'Choose date range' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <DateRangePicker label="Range" />
        <span data-testid="outside">Outside</span>
      </div>,
    );
    await user.click(screen.getByLabelText('Range'));
    await user.click(screen.getByTestId('outside'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('toggles via calendar icon button', async () => {
    const user = userEvent.setup();
    render(<DateRangePicker label="Range" />);
    const iconButton = screen.getByRole('button', { name: 'Open calendar' });
    await user.click(iconButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(iconButton);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows partial range display when only start is set', () => {
    render(<DateRangePicker label="Range" startValue="2024-03-10" />);
    const input = screen.getByLabelText('Range');
    expect(input).toHaveValue(`${formatDisplayDate('2024-03-10')} –`);
  });

  it('reorders dates when end is before start', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<DateRangePicker label="Range" onChange={onChange} />);
    await user.click(screen.getByLabelText('Range'));

    const days = screen.getAllByRole('gridcell').filter((btn) => !btn.disabled);
    await user.click(days[10]);
    await user.click(days[2]);

    expect(onChange).toHaveBeenCalled();
    const [start, end] = onChange.mock.calls[0];
    expect(start <= end).toBe(true);
  });

  it('highlights hover preview while selecting end date', async () => {
    const user = userEvent.setup();
    render(<DateRangePicker label="Range" />);
    await user.click(screen.getByLabelText('Range'));

    const days = screen.getAllByRole('gridcell').filter((btn) => !btn.disabled);
    await user.click(days[0]);
    fireEvent.mouseEnter(days[4]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('navigates months within min and max', async () => {
    const user = userEvent.setup();
    render(
      <DateRangePicker
        label="Range"
        startValue="2024-06-01"
        min="2024-06-01"
        max="2024-07-31"
      />,
    );
    await user.click(screen.getByLabelText('Range'));
    expect(screen.getByRole('button', { name: 'Previous month' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<DateRangePicker label="Range" disabled />);
    await user.click(screen.getByLabelText('Range'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
