import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tag } from './Tag.js';

describe('Tag', () => {
  it('renders label text', () => {
    render(<Tag label="Design" />);
    expect(screen.getByText('Design')).toBeInTheDocument();
  });

  it('renders children when label is not set', () => {
    render(<Tag>Filter</Tag>);
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', async () => {
    const user = userEvent.setup();
    const onDismiss = jest.fn();

    render(<Tag label="Removable" dismissible onDismiss={onDismiss} />);
    await user.click(screen.getByLabelText('Remove tag'));

    expect(onDismiss).toHaveBeenCalled();
  });

  it('applies variant class', () => {
    const { container } = render(<Tag label="Critical" variant="danger" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/danger/);
  });
});
