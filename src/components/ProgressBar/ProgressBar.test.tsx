import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar.js';

describe('ProgressBar', () => {
  it('renders progressbar role', () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
  });

  it('shows percentage when showValue', () => {
    render(<ProgressBar value={25} max={100} showValue label="Upload" />);
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('uses loading valuetext when indeterminate', () => {
    render(<ProgressBar indeterminate />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuetext', 'Loading');
  });
});
