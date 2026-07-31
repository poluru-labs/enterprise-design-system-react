import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from './Drawer.js';

describe('Drawer', () => {
  it('renders panel content when open', () => {
    render(
      <Drawer open heading="Settings">
        Drawer body
      </Drawer>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Drawer body')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<Drawer open={false}>Hidden</Drawer>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when close button is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <Drawer open onOpenChange={onOpenChange} heading="Panel">
        Body
      </Drawer>,
    );

    await user.click(screen.getByLabelText('Close panel'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes on Escape key', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <Drawer open onOpenChange={onOpenChange}>
        Body
      </Drawer>,
    );

    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
