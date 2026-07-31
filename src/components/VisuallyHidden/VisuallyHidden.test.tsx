import { render, screen } from '@testing-library/react';
import { VisuallyHidden } from './VisuallyHidden.js';
describe('VisuallyHidden', () => {
  it('renders children', () => { render(<VisuallyHidden>Hidden label</VisuallyHidden>); expect(screen.getByText('Hidden label')).toBeInTheDocument(); });
  it('applies hidden class', () => { render(<VisuallyHidden>Text</VisuallyHidden>); expect(screen.getByText('Text').className).toMatch(/hidden/); });
  it('wraps with display contents root', () => { const { container } = render(<VisuallyHidden>A</VisuallyHidden>); expect(container.firstElementChild?.className).toMatch(/root/); });
});
