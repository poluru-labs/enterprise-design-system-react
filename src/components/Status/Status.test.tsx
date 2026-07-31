import { render, screen } from '@testing-library/react';
import { Status } from './Status.js';

describe('Status', () => {
  it('renders label', () => {
    render(<Status label="Active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Status label="OK" variant="success" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/success/);
  });

  it('supports pulse', () => {
    const { container } = render(<Status label="Syncing" pulse />);
    expect((container.firstChild as HTMLElement).className).toMatch(/pulse/);
  });
});
