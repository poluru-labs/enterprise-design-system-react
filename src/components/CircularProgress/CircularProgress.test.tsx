import { render, screen } from '@testing-library/react';
import { CircularProgress } from './CircularProgress.js';

describe('CircularProgress', () => {
  it('renders progressbar', () => {
    render(<CircularProgress value={40} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '40');
  });

  it('shows value text', () => {
    render(<CircularProgress value={50} showValue />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('indeterminate mode', () => {
    render(<CircularProgress indeterminate />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuetext', 'Loading');
  });
});
