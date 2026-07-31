import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SegmentedControl } from './SegmentedControl.js';
const options = [{ label: 'Day', value: 'day' }, { label: 'Week', value: 'week' }, { label: 'Month', value: 'month', disabled: true }];
describe('SegmentedControl', () => {
  it('renders options', () => { render(<SegmentedControl options={options} value="day" />); expect(screen.getByRole('button', { name: 'Day' })).toHaveAttribute('aria-pressed', 'true'); });
  it('calls onChange', async () => { const user = userEvent.setup(); const onChange = jest.fn(); render(<SegmentedControl options={options} value="day" onChange={onChange} />); await user.click(screen.getByRole('button', { name: 'Week' })); expect(onChange).toHaveBeenCalledWith('week'); });
  it('ignores disabled options', async () => { const user = userEvent.setup(); const onChange = jest.fn(); render(<SegmentedControl options={options} value="day" onChange={onChange} />); await user.click(screen.getByRole('button', { name: 'Month' })); expect(onChange).not.toHaveBeenCalled(); });
});
