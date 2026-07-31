import { fireEvent, render, screen } from '@testing-library/react';
import { Slider } from './Slider.js';

describe('Slider', () => {
  it('renders with label', () => {
    render(<Slider label="Volume" defaultValue={50} />);
    expect(screen.getByLabelText('Volume')).toBeInTheDocument();
  });

  it('shows value when showValue is true', () => {
    render(<Slider label="Volume" value={42} showValue onChange={() => {}} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('calls onChange when adjusted', () => {
    const onChange = jest.fn();
    render(<Slider label="Volume" defaultValue={50} onChange={onChange} />);
    const slider = screen.getByLabelText('Volume');
    fireEvent.change(slider, { target: { value: '75' } });
    expect(onChange).toHaveBeenCalledWith(expect.any(Object), 75);
  });

  it('calls onInput while dragging', () => {
    const onInput = jest.fn();
    render(<Slider label="Volume" defaultValue={50} onInput={onInput} />);
    const slider = screen.getByLabelText('Volume');
    fireEvent.input(slider, { target: { value: '60' } });
    expect(onInput).toHaveBeenCalledWith(expect.any(Object), 60);
  });
});
