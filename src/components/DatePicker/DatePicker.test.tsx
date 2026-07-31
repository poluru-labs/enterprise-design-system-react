import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { formatDisplayDate } from '../../utils/date-utils.js';
import { DatePicker } from './DatePicker.js';

describe('DatePicker', () => {
  it('renders label and placeholder', () => {
    render(<DatePicker label="Start date" placeholder="Select date" />);
    expect(screen.getByLabelText('Start date')).toHaveAttribute('placeholder', 'Select date');
  });

  it('opens calendar on input click', async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Date" />);
    await user.click(screen.getByLabelText('Date'));
    expect(screen.getByRole('dialog', { name: 'Choose date' })).toBeInTheDocument();
  });

  it('calls onChange when date selected', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<DatePicker label="Date" onChange={onChange} />);
    await user.click(screen.getByLabelText('Date'));
    const dayButtons = screen.getAllByRole('gridcell');
    const inMonth = dayButtons.find((btn) => !btn.disabled && btn.textContent === '15');
    if (inMonth) await user.click(inMonth);
    expect(onChange).toHaveBeenCalled();
  });

  it('opens on Enter and Space keys', async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Date" />);
    const input = screen.getByLabelText('Date');
    input.focus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('dialog', { name: 'Choose date' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    await user.keyboard(' ');
    expect(screen.getByRole('dialog', { name: 'Choose date' })).toBeInTheDocument();
  });

  it('closes on Escape and outside pointer down', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <DatePicker label="Date" />
        <button type="button">Outside</button>
      </div>,
    );
    await user.click(screen.getByLabelText('Date'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByLabelText('Date'));
    await user.click(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('toggles calendar via icon button', async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Date" />);
    const iconButton = screen.getByRole('button', { name: 'Open calendar' });
    await user.click(iconButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(iconButton);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('displays formatted value and shows hint or error', () => {
    const { rerender } = render(
      <DatePicker label="Date" value="2024-06-15" hint="Pick a date" />,
    );
    const input = screen.getByLabelText('Date');
    expect(input).toHaveValue(formatDisplayDate('2024-06-15'));
    expect(screen.getByText('Pick a date')).toBeInTheDocument();

    rerender(
      <DatePicker label="Date" value="2024-06-15" invalid errorMessage="Required" />,
    );
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Date" disabled />);
    await user.click(screen.getByLabelText('Date'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('navigates months within min and max bounds', async () => {
    const user = userEvent.setup();
    render(
      <DatePicker label="Date" value="2024-06-15" min="2024-06-01" max="2024-08-31" />,
    );
    await user.click(screen.getByLabelText('Date'));
    expect(screen.getByRole('button', { name: 'Previous month' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
