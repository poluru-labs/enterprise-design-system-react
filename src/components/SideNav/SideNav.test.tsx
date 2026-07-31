import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SideNav } from './SideNav.js';
const items = [{ label: 'Dashboard', href: '/dashboard', icon: 'home', active: true }, { label: 'Settings', href: '/settings', icon: 'settings' }];
const nestedItems = [
  {
    label: 'Reports',
    icon: 'file',
    children: [{ label: 'Monthly', href: '/monthly' }, { label: 'Annual', href: '/annual' }],
  },
  { label: 'Team', href: '/team' },
];

describe('SideNav', () => {
  it('renders nav items', () => { render(<SideNav items={items} />); expect(screen.getByRole('navigation', { name: 'Side navigation' })).toBeInTheDocument(); });
  it('fires onNavigate for leaf links', async () => { const user = userEvent.setup(); const onNavigate = jest.fn(); render(<SideNav items={items} onNavigate={onNavigate} />); await user.click(screen.getByRole('link', { name: /Settings/ })); expect(onNavigate).toHaveBeenCalledWith('Settings', '/settings'); });
  it('marks active item', () => { render(<SideNav items={items} />); expect(screen.getByRole('link', { name: /Dashboard/ })).toHaveAttribute('aria-current', 'page'); });

  it('expands and collapses nested sections', async () => {
    const user = userEvent.setup();
    render(<SideNav items={nestedItems} />);

    const reportsButton = screen.getByRole('button', { name: /Reports/ });
    expect(reportsButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(reportsButton);
    expect(reportsButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: /Monthly/ })).toBeInTheDocument();

    await user.click(reportsButton);
    expect(reportsButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link', { name: /Monthly/ })).not.toBeInTheDocument();
  });

  it('fires onNavigate for nested leaf links', async () => {
    const user = userEvent.setup();
    const onNavigate = jest.fn();
    render(<SideNav items={nestedItems} onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: /Reports/ }));
    await user.click(screen.getByRole('link', { name: /Annual/ }));

    expect(onNavigate).toHaveBeenCalledWith('Annual', '/annual');
  });

  it('renders leaf items without href as buttons', async () => {
    const user = userEvent.setup();
    const onNavigate = jest.fn();
    const buttonItems = [{ label: 'Action' }];

    render(<SideNav items={buttonItems} onNavigate={onNavigate} />);
    await user.click(screen.getByRole('button', { name: /Action/ }));
    expect(onNavigate).toHaveBeenCalledWith('Action', undefined);
  });

  it('applies collapsed class and title tooltips', () => {
    const { container } = render(<SideNav items={items} collapsed />);
    expect(container.firstChild).toHaveClass(/collapsed/);
    expect(screen.getByRole('link', { name: /Dashboard/ })).toHaveAttribute('title', 'Dashboard');
  });
});
