import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner.js';
describe('Spinner', () => {
  it('has status role', () => { render(<Spinner />); expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true'); });
  it('shows visible label', () => { render(<Spinner showLabel label="Please wait" />); expect(screen.getByText('Please wait')).toBeVisible(); });
  it('keeps sr-only label by default', () => { render(<Spinner label="Loading data" />); expect(screen.getByText('Loading data')).toBeInTheDocument(); });
});
