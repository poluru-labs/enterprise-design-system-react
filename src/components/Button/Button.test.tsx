import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button.js';

describe('Button', () => {
  it('renders label content', () => {
    render(<Button>Continue</Button>);
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('uses accessible label for icon-only buttons', () => {
    render(
      <Button iconOnly icon="settings" accessibleLabel="Settings">
        Hidden
      </Button>,
    );
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument();
  });

  it('renders as anchor when href is provided', () => {
    render(
      <Button href="https://example.com" target="_blank">
        Visit
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Visit' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not navigate when loading', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Button href="https://example.com" loading onClick={onClick}>
        Loading
      </Button>,
    );

    await user.click(screen.getByRole('link', { name: 'Loading' }));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('link', { name: 'Loading' })).toHaveAttribute('aria-busy', 'true');
  });

  it('renders leading and trailing icons', () => {
    render(
      <Button icon="settings" iconTrailing="chevron-down">
        Options
      </Button>,
    );
    expect(screen.getByRole('button', { name: 'Options' })).toBeInTheDocument();
  });
});
