import { render, screen } from '@testing-library/react';
import { Icon } from './Icon.js';

describe('Icon', () => {
  it('renders an svg for a valid icon name', () => {
    const { container } = render(<Icon name="search" size="md" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg?.querySelector('path, circle, rect, line, polyline, polygon')).toBeTruthy();
  });

  it('applies size classes to the svg', () => {
    const { container } = render(<Icon name="check" size="lg" />);
    expect(container.querySelector('svg.lg')).toBeTruthy();
  });

  it('exposes accessible label when decorative is false', () => {
    render(<Icon name="info" decorative={false} label="Information" />);
    const svg = screen.getByRole('img', { name: 'Information' });
    expect(svg).toBeInTheDocument();
  });

  it('renders nothing for an invalid icon name', () => {
    const { container } = render(<Icon name={'not-a-real-icon' as 'check'} />);
    expect(container.querySelector('svg')).toBeNull();
  });
});
