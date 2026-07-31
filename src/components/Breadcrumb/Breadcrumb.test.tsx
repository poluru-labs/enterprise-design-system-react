import { render, screen } from '@testing-library/react';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb.js';

describe('Breadcrumb', () => {
  it('renders items array', () => {
    render(
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Settings' }]} />,
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByText('Settings')).toHaveAttribute('aria-current', 'page');
  });

  it('renders children', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem label="A" href="/a" separator />
        <BreadcrumbItem label="B" current />
      </Breadcrumb>,
    );
    expect(screen.getByRole('link', { name: 'A' })).toBeInTheDocument();
  });

  it('has breadcrumb nav label', () => {
    render(<Breadcrumb items={[{ label: 'Home' }]} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });
});
