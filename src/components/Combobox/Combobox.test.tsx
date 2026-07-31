import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox } from './Combobox.js';

const options = [
  { label: 'New York', value: 'ny' },
  { label: 'Los Angeles', value: 'la' },
  { label: 'Chicago', value: 'chi' },
  { label: 'Disabled City', value: 'dis', disabled: true },
];

describe('Combobox', () => {
  it('renders with label', () => {
    render(<Combobox label="City" options={options} />);
    expect(screen.getByLabelText('City')).toBeInTheDocument();
  });

  it('filters options while typing', async () => {
    const user = userEvent.setup();
    render(<Combobox label="City" options={options} />);
    await user.type(screen.getByLabelText('City'), 'Los');
    expect(screen.getByRole('option', { name: 'Los Angeles' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Chicago' })).not.toBeInTheDocument();
  });

  it('calls onChange when option selected', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Combobox label="City" options={options} onChange={onChange} />);
    await user.click(screen.getByLabelText('City'));
    await user.click(screen.getByRole('option', { name: 'Chicago' }));
    expect(onChange).toHaveBeenCalledWith('chi');
  });

  it('navigates options with arrow keys and selects with Enter', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Combobox label="City" options={options} onChange={onChange} />);

    const input = screen.getByLabelText('City');
    await user.click(input);
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

    expect(onChange).toHaveBeenCalledWith('la');
  });

  it('closes list and resets filter on Escape', async () => {
    const user = userEvent.setup();
    render(<Combobox label="City" options={options} defaultValue="chi" />);

    const input = screen.getByLabelText('City');
    await user.click(input);
    await user.clear(input);
    await user.type(input, 'Los');
    expect(screen.getByRole('option', { name: 'Los Angeles' })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(input).toHaveValue('Chicago');
  });

  it('shows empty state when no matches', async () => {
    const user = userEvent.setup();
    render(<Combobox label="City" options={options} />);
    await user.type(screen.getByLabelText('City'), 'zzz');
    expect(screen.getByText('No matches found')).toBeInTheDocument();
  });

  it('calls onInput while typing', async () => {
    const user = userEvent.setup();
    const onInput = jest.fn();
    render(<Combobox label="City" options={options} onInput={onInput} />);
    await user.type(screen.getByLabelText('City'), 'Ch');
    expect(onInput).toHaveBeenCalled();
  });

  it('closes list on blur outside combobox', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Combobox label="City" options={options} />
        <button type="button">Outside</button>
      </div>,
    );

    await user.click(screen.getByLabelText('City'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('does not select disabled options', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Combobox label="City" options={options} onChange={onChange} />);

    await user.click(screen.getByLabelText('City'));
    await user.click(screen.getByRole('option', { name: 'Disabled City' }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
