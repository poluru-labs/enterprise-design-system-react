import { render, screen } from '@testing-library/react';
import { Kbd } from './Kbd.js';
describe('Kbd', () => {
  it('renders keys prop', () => { render(<Kbd keys="⌘ K" />); expect(screen.getByText('⌘ K')).toBeInTheDocument(); });
  it('renders children', () => { render(<Kbd>Ctrl</Kbd>); expect(screen.getByText('Ctrl')).toBeInTheDocument(); });
  it('uses kbd element', () => { render(<Kbd keys="Enter" />); expect(screen.getByText('Enter').tagName).toBe('KBD'); });
});
