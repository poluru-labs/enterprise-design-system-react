import { render, screen } from '@testing-library/react';
import { Toolbar } from './Toolbar.js';

describe('Toolbar', () => {
  it('renders toolbar role', () => {
    render(<Toolbar start="Actions" />);
    expect(screen.getByRole('toolbar')).toBeInTheDocument();
  });

  it('renders start and end slots', () => {
    render(<Toolbar start="Left" end="Right" />);
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('renders children in center', () => {
    render(<Toolbar>Center content</Toolbar>);
    expect(screen.getByText('Center content')).toBeInTheDocument();
  });
});
