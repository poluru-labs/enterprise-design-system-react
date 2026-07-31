import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Autocomplete } from './Autocomplete.js';

const suggestions = ['Apple', 'Apricot', 'Banana', 'Blueberry'];

describe('Autocomplete', () => {
  it('renders with label', () => {
    render(<Autocomplete label="Fruit" suggestions={suggestions} />);
    expect(screen.getByLabelText('Fruit')).toBeInTheDocument();
  });

  it('shows suggestions when typing', async () => {
    const user = userEvent.setup();
    render(<Autocomplete label="Fruit" suggestions={suggestions} />);
    await user.type(screen.getByLabelText('Fruit'), 'Ap');
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Apricot' })).toBeInTheDocument();
  });

  it('calls onSelect when suggestion chosen', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<Autocomplete label="Fruit" suggestions={suggestions} onSelect={onSelect} />);
    await user.type(screen.getByLabelText('Fruit'), 'Ban');
    await user.click(screen.getByRole('option', { name: 'Banana' }));
    expect(onSelect).toHaveBeenCalledWith('Banana');
  });

  it('navigates suggestions with arrow keys and selects with Enter', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<Autocomplete label="Fruit" suggestions={suggestions} onSelect={onSelect} />);

    const input = screen.getByLabelText('Fruit');
    await user.type(input, 'Ap');
    await user.keyboard('{ArrowDown}{Enter}');

    expect(onSelect).toHaveBeenCalledWith('Apricot');
  });

  it('closes list on Escape and blur', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Autocomplete label="Fruit" suggestions={suggestions} />
        <button type="button">Outside</button>
      </div>,
    );

    const input = screen.getByLabelText('Fruit');
    await user.type(input, 'Ap');
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await user.click(input);
    await user.type(input, 'Ba');
    await user.click(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes list when query no longer matches', async () => {
    const user = userEvent.setup();
    render(<Autocomplete label="Fruit" suggestions={suggestions} />);

    const input = screen.getByLabelText('Fruit');
    await user.type(input, 'Ap');
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, 'zzz');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('respects minChars before opening list', async () => {
    const user = userEvent.setup();
    render(<Autocomplete label="Fruit" suggestions={suggestions} minChars={3} />);

    await user.type(screen.getByLabelText('Fruit'), 'Ap');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await user.type(screen.getByLabelText('Fruit'), 'p');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });
});
