import { render, screen } from '@testing-library/react';
import { Meter } from './Meter.js';
describe('Meter', () => {
  it('renders meter element', () => { render(<Meter value={50} />); expect(document.querySelector('meter')).toHaveAttribute('value', '50'); });
  it('shows value text', () => { render(<Meter value={30} max={100} showValue label="Disk" />); expect(screen.getByText('30 of 100')).toBeInTheDocument(); });
  it('clamps value', () => { render(<Meter value={150} max={100} />); expect(document.querySelector('meter')).toHaveAttribute('value', '100'); });
});
