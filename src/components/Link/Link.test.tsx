import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link } from './Link.js';

describe('Link', () => {
  it('renders anchor', () => {
    render(<Link href="/docs">Docs</Link>);
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
  });

  it('calls onClick', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Link href="#" onClick={onClick}>
        Click
      </Link>,
    );
    await user.click(screen.getByRole('link'));
    expect(onClick).toHaveBeenCalled();
  });

  it('prevents click when disabled', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Link href="#" disabled onClick={onClick}>
        X
      </Link>,
    );
    await user.click(screen.getByText('X'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
