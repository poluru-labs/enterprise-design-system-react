import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton.js';
describe('Skeleton', () => {
  it('renders text variant', () => { const { container } = render(<Skeleton />); expect(container.firstChild).toHaveAttribute('aria-hidden', 'true'); });
  it('renders multiple lines', () => { const { container } = render(<Skeleton lines={3} />); expect(container.querySelectorAll('[class*="root"]').length).toBe(3); });
  it('applies custom width', () => { const { container } = render(<Skeleton width="200px" />); expect(container.firstChild).toHaveStyle({ width: '200px' }); });
});
