import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip.js';

describe('Tooltip', () => {
  it('renders trigger without tooltip content when empty', () => {
    render(
      <Tooltip content="">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on hover after delay', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <Tooltip content="Help text" delay={200}>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole('button'));
    jest.advanceTimersByTime(200);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveTextContent('Help text');
    });

    jest.useRealTimers();
  });

  it('sets aria-describedby when visible', async () => {
    render(
      <Tooltip content="Tip" delay={0}>
        <button type="button">Focus me</button>
      </Tooltip>,
    );

    const button = screen.getByRole('button');
    button.focus();

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-describedby');
    });
  });

  it('clears aria-describedby on mouse leave', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <Tooltip content="Tip" delay={0}>
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    const button = screen.getByRole('button');
    await user.hover(button);
    jest.advanceTimersByTime(0);
    await waitFor(() => expect(button).toHaveAttribute('aria-describedby'));

    await user.unhover(button);
    jest.advanceTimersByTime(50);

    await waitFor(() => {
      expect(button).not.toHaveAttribute('aria-describedby');
    });

    jest.useRealTimers();
  });
});
