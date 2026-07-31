import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Rating } from './Rating.js';

describe('Rating', () => {
  it('renders star buttons', () => {
    render(<Rating max={5} />);
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('calls onChange when star clicked', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Rating onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Rate 3 of 5' }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('does not call onChange when readonly', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Rating readonly onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Rate 1 of 5' }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
