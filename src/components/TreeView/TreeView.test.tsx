import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TreeView } from './TreeView.js';

const items = [
  {
    id: '1',
    label: 'Documents',
    children: [{ id: '1-1', label: 'Report.pdf' }],
  },
  { id: '2', label: 'Images' },
];

describe('TreeView', () => {
  it('renders tree items', () => {
    render(<TreeView items={items} />);
    expect(screen.getByRole('tree')).toBeInTheDocument();
    expect(screen.getByText('Documents')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<TreeView items={[]} />);
    expect(screen.getByText('No items')).toBeInTheDocument();
  });

  it('calls onSelect when item clicked', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<TreeView items={items} onSelect={onSelect} />);
    await user.click(screen.getByText('Images'));
    expect(onSelect).toHaveBeenCalledWith('2');
  });

  it('expands and collapses via toggle button', async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();
    render(<TreeView items={items} onToggle={onToggle} />);
    await user.click(screen.getByLabelText('Expand'));
    expect(onToggle).toHaveBeenCalledWith('1', true);
  });

  it('supports keyboard select and expand', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    const onToggle = jest.fn();
    render(
      <TreeView
        items={items}
        expandedIds={{}}
        onSelect={onSelect}
        onToggle={onToggle}
      />,
    );

    const parent = screen.getByRole('treeitem', { name: /Documents/i });
    parent.focus();
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledWith('1');

    await user.keyboard('{ArrowRight}');
    expect(onToggle).toHaveBeenCalledWith('1', true);
  });

  it('collapses with ArrowLeft when expanded', async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();
    render(
      <TreeView items={items} expandedIds={{ '1': true }} onToggle={onToggle} />,
    );
    const parent = screen.getByRole('treeitem', { name: /Documents/i });
    parent.focus();
    await user.keyboard('{ArrowLeft}');
    expect(onToggle).toHaveBeenCalledWith('1', false);
  });
});
