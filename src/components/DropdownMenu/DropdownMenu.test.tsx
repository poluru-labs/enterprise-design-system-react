import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenu } from './DropdownMenu.js';
import { MenuItem } from '../MenuItem/MenuItem.js';

describe('DropdownMenu', () => {
  it('renders menu items when open', () => {
    render(
      <DropdownMenu open trigger={<button type="button">Menu</button>}>
        <MenuItem label="Edit" />
        <MenuItem label="Delete" danger />
      </DropdownMenu>,
    );

    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument();
  });

  it('does not show menu when closed', () => {
    render(
      <DropdownMenu open={false} trigger={<button type="button">Menu</button>}>
        <MenuItem label="Hidden" />
      </DropdownMenu>,
    );

    expect(screen.getByRole('menu', { hidden: true })).toBeInTheDocument();
  });

  it('calls onSelect and closes when item is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    const onOpenChange = jest.fn();

    render(
      <DropdownMenu
        open
        onOpenChange={onOpenChange}
        onSelect={onSelect}
        trigger={<button type="button">Menu</button>}
      >
        <MenuItem label="Copy" value="copy" />
      </DropdownMenu>,
    );

    await user.click(screen.getByRole('menuitem', { name: 'Copy' }));
    expect(onSelect).toHaveBeenCalledWith({ value: 'copy', label: 'Copy' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <DropdownMenu open onOpenChange={onOpenChange} trigger={<button type="button">Menu</button>}>
        <MenuItem label="Item" />
      </DropdownMenu>,
    );

    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('navigates items with arrow keys', async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu open trigger={<button type="button">Menu</button>}>
        <MenuItem label="First" />
        <MenuItem label="Second" />
        <MenuItem label="Third" />
      </DropdownMenu>,
    );

    const items = screen.getAllByRole('menuitem');
    await waitFor(() => expect(items[0]).toHaveFocus());

    await user.keyboard('{ArrowDown}');
    expect(items[1]).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(items[0]).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(items[2]).toHaveFocus();
  });

  it('closes when clicking outside', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <div>
        <DropdownMenu open onOpenChange={onOpenChange} trigger={<button type="button">Menu</button>}>
          <MenuItem label="Item" />
        </DropdownMenu>
        <button type="button">Outside</button>
      </div>,
    );

    await user.click(screen.getByRole('button', { name: 'Outside' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('toggles open state from trigger', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <DropdownMenu open={false} onOpenChange={onOpenChange} trigger={<button type="button">Menu</button>}>
        <MenuItem label="Item" />
      </DropdownMenu>,
    );

    await user.click(screen.getByRole('button', { name: 'Menu' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('supports placement variants', () => {
    render(
      <DropdownMenu open placement="top" trigger={<button type="button">Menu</button>}>
        <MenuItem label="Item" />
      </DropdownMenu>,
    );
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});
