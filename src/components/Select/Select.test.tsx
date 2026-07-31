import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select.js';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

describe('Select', () => {
  it('renders options', () => {
    render(<Select label="Fruit" options={options} />);
    expect(screen.getByLabelText('Fruit')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
  });

  it('calls onChange when selection changes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Select label="Fruit" options={options} onChange={onChange} />);
    await user.selectOptions(screen.getByLabelText('Fruit'), 'banana');
    expect(onChange).toHaveBeenCalled();
  });

  it('shows placeholder option', () => {
    render(<Select label="Fruit" options={options} placeholder="Choose fruit" />);
    expect(screen.getByRole('option', { name: 'Choose fruit' })).toBeInTheDocument();
  });
});
