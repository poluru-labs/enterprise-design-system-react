import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState.js';

describe('EmptyState', () => {
  it('renders heading and description', () => {
    render(
      <EmptyState heading="No results" description="Try adjusting your filters." />,
    );

    expect(screen.getByRole('heading', { name: 'No results' })).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your filters.')).toBeInTheDocument();
  });

  it('renders default folder icon', () => {
    const { container } = render(<EmptyState heading="Empty" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders actions slot', () => {
    render(
      <EmptyState
        heading="Empty"
        actions={<button type="button">Create item</button>}
      />,
    );

    expect(screen.getByRole('button', { name: 'Create item' })).toBeInTheDocument();
  });

  it('renders extra children content', () => {
    render(<EmptyState heading="Empty">Extra details</EmptyState>);
    expect(screen.getByText('Extra details')).toBeInTheDocument();
  });
});
