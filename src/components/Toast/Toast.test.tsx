import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast, ToastProvider, showToast, useToast } from './Toast.js';

function ToastTrigger() {
  const { show } = useToast();
  return (
    <button type="button" onClick={() => show({ title: 'Saved', variant: 'success' })}>
      Show toast
    </button>
  );
}

function DismissTrigger() {
  const { show } = useToast();
  return (
    <button
      type="button"
      onClick={() => show({ title: 'Dismiss via hook', variant: 'info', duration: 0 })}
    >
      Show persistent
    </button>
  );
}

describe('Toast', () => {
  it('renders declarative toast with title and description', () => {
    render(
      <Toast title="Update complete" description="Your changes were saved." variant="success" />,
    );

    expect(screen.getByText('Update complete')).toBeInTheDocument();
    expect(screen.getByText('Your changes were saved.')).toBeInTheDocument();
  });

  it('shows toast via useToast inside provider', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Show toast' }));

    await waitFor(() => {
      expect(screen.getByText('Saved')).toBeInTheDocument();
    });
  });

  it('shows toast via imperative showToast API', async () => {
    render(
      <ToastProvider>
        <span>App</span>
      </ToastProvider>,
    );

    showToast({ title: 'Hello', description: 'World', variant: 'info' });

    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(screen.getByText('World')).toBeInTheDocument();
    });
  });

  it('dismisses toast when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Toast title="Dismiss me" onClose={onClose} />,
    );

    await user.click(screen.getByLabelText('Dismiss notification'));
    expect(onClose).toHaveBeenCalled();
  });

  it('returns null for closed declarative toast', () => {
    const { container } = render(<Toast title="Hidden" open={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('warns when showToast is called without provider', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    expect(showToast({ title: 'Orphan' })).toBe('');
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('throws when useToast is used outside provider', () => {
    function BadConsumer() {
      useToast();
      return null;
    }

    expect(() => render(<BadConsumer />)).toThrow('useToast must be used within a ToastProvider');
  });

  it('auto dismisses toast after duration', async () => {
    render(
      <ToastProvider>
        <span>App</span>
      </ToastProvider>,
    );

    showToast({ title: 'Timed toast', duration: 50 });

    await waitFor(() => {
      expect(screen.getByText('Timed toast')).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(screen.queryByText('Timed toast')).not.toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });

  it('dismisses provider toast via close button', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Show toast' }));
    await waitFor(() => expect(screen.getByText('Saved')).toBeInTheDocument());

    await user.click(screen.getByLabelText('Dismiss notification'));
    await waitFor(() => expect(screen.queryByText('Saved')).not.toBeInTheDocument());
  });

  it('dismisses persistent provider toast via close button', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <DismissTrigger />
      </ToastProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Show persistent' }));
    await waitFor(() => expect(screen.getByText('Dismiss via hook')).toBeInTheDocument());

    await user.click(screen.getByLabelText('Dismiss notification'));
    await waitFor(() => expect(screen.queryByText('Dismiss via hook')).not.toBeInTheDocument());
  });
});
