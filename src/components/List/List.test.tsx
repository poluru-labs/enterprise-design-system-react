import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { List } from './List.js';
describe('List', () => {
  it('renders items', () => { render(<List items={[{ label: 'Inbox' }, { label: 'Sent' }]} />); expect(screen.getByText('Inbox')).toBeInTheDocument(); });
  it('calls onSelect', async () => { const user = userEvent.setup(); const onSelect = jest.fn(); render(<List items={[{ label: 'Drafts' }]} onSelect={onSelect} />); await user.click(screen.getByRole('button')); expect(onSelect).toHaveBeenCalledWith('Drafts', 0); });
  it('skips disabled items', async () => { const user = userEvent.setup(); const onSelect = jest.fn(); render(<List items={[{ label: 'Locked', disabled: true }]} onSelect={onSelect} />); await user.click(screen.getByRole('button')); expect(onSelect).not.toHaveBeenCalled(); });
});
