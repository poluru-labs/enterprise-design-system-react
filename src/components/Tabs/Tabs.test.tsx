import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tab, Tabs } from './Tabs.js';

describe('Tabs', () => {
  it('renders tab labels and active panel', () => {
    render(
      <Tabs defaultSelectedIndex={0}>
        <Tab label="One">Panel one</Tab>
        <Tab label="Two">Panel two</Tab>
      </Tabs>,
    );
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Panel one')).toBeVisible();
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'false');
  });

  it('switches panels on click', async () => {
    const user = userEvent.setup();
    render(
      <Tabs>
        <Tab label="One">Panel one</Tab>
        <Tab label="Two">Panel two</Tab>
      </Tabs>,
    );
    await user.click(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Panel two')).toBeVisible();
  });

  it('supports arrow key navigation', async () => {
    const user = userEvent.setup();
    render(
      <Tabs>
        <Tab label="One">Panel one</Tab>
        <Tab label="Two">Panel two</Tab>
      </Tabs>,
    );
    screen.getByRole('tab', { name: 'One' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
  });
});
