import { render, screen } from '@testing-library/react';
import { Badge } from './Badge.js';

describe('Badge', () => {
  it('renders label text', () => {
    render(<Badge label="New" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders children when label is not set', () => {
    render(<Badge>3</Badge>);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    render(<Badge label="Beta" variant="brand" size="sm" />);
    const badge = screen.getByText('Beta');
    expect(badge).toHaveClass('brand', 'sm');
  });

  it('applies pill shape when pill is true', () => {
    render(<Badge label="Live" pill />);
    expect(screen.getByText('Live')).toHaveClass('pill');
  });
});
