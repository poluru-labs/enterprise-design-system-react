import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio, RadioGroup } from './index.js';

describe('RadioGroup', () => {
  it('renders radio options from options prop', () => {
    render(
      <RadioGroup
        label="Color"
        name="color"
        options={[
          { label: 'Red', value: 'red' },
          { label: 'Blue', value: 'blue' },
        ]}
      />,
    );
    expect(screen.getByText('Color')).toBeInTheDocument();
    expect(screen.getByLabelText('Red')).toBeInTheDocument();
    expect(screen.getByLabelText('Blue')).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <RadioGroup
        name="color"
        options={[
          { label: 'Red', value: 'red' },
          { label: 'Blue', value: 'blue' },
        ]}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByLabelText('Blue'));
    expect(onChange).toHaveBeenCalledWith(expect.any(Object), 'blue');
  });

  it('renders child Radio components', () => {
    render(
      <RadioGroup name="size" label="Size">
        <Radio value="sm" label="Small" />
        <Radio value="lg" label="Large" />
      </RadioGroup>,
    );
    expect(screen.getByLabelText('Small')).toBeInTheDocument();
  });
});
