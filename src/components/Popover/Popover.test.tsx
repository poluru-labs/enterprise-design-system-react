import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './Popover.js';

describe('Popover', () => {
  it('renders trigger and panel when open', () => {
    render(
      <Popover open trigger={<button type="button">Open</button>} heading="Details">
        Popover content
      </Popover>,
    );

    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('does not render panel when closed', () => {
    render(
      <Popover
        open={false}
        trigger={<button type="button">Open</button>}
        heading="Hidden"
      >
        Hidden content
      </Popover>,
    );

    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when trigger is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <Popover
        open={false}
        onOpenChange={onOpenChange}
        trigger={<button type="button">Toggle</button>}
      >
        Content
      </Popover>,
    );

    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <Popover
        open
        onOpenChange={onOpenChange}
        trigger={<button type="button">Toggle</button>}
      >
        Content
      </Popover>,
    );

    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
