import { render, screen } from '@testing-library/react';
import { Divider } from './Divider.js';
describe('Divider', () => {
  it('renders horizontal separator', () => { render(<Divider />); expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal'); });
  it('renders vertical separator', () => { render(<Divider orientation="vertical" />); expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical'); });
  it('renders label', () => { render(<Divider label="Or" />); expect(screen.getByText('Or')).toBeInTheDocument(); });
});
