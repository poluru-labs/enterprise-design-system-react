import { render, screen } from '@testing-library/react';
import { Card } from './Card.js';

describe('Card', () => {
  it('renders body content', () => {
    render(<Card>Card body</Card>);
    expect(screen.getByText('Card body')).toBeInTheDocument();
  });

  it('renders header and footer slots', () => {
    render(
      <Card header="Header" footer="Footer">
        Body
      </Card>,
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies elevated class when elevated is true', () => {
    const { container } = render(<Card elevated>Elevated</Card>);
    expect(container.querySelector('article')).toHaveClass('elevated');
  });

  it('renders media section when provided', () => {
    render(<Card media={<img alt="Preview" src="/test.png" />}>Body</Card>);
    expect(screen.getByRole('img', { name: 'Preview' })).toBeInTheDocument();
  });
});
