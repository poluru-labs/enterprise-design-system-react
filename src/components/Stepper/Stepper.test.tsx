import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Stepper } from './Stepper.js';
const steps = [{ label: 'Account' }, { label: 'Details' }, { label: 'Review' }];
describe('Stepper', () => {
  it('renders steps', () => { render(<Stepper steps={steps} current={1} />); expect(screen.getByText('Account')).toBeInTheDocument(); });
  it('marks current step', () => { render(<Stepper steps={steps} current={1} />); expect(screen.getByRole('listitem', { current: 'step' })).toBeInTheDocument(); });
  it('calls onStepClick for completed steps', async () => { const user = userEvent.setup(); const onStepClick = jest.fn(); render(<Stepper steps={steps} current={2} onStepClick={onStepClick} />); await user.click(screen.getByText('Account')); expect(onStepClick).toHaveBeenCalledWith(0); });
});
