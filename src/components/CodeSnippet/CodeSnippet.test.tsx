import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeSnippet } from './CodeSnippet.js';

describe('CodeSnippet', () => {
  const writeText = jest.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    writeText.mockClear();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  it('renders code content', () => {
    render(<CodeSnippet code={'<button>Click</button>'} />);
    expect(screen.getByText('<button>Click</button>')).toBeInTheDocument();
  });

  it('returns null when code is empty', () => {
    const { container } = render(<CodeSnippet code="   " />);
    expect(container.firstChild).toBeNull();
  });

  it('copies code to clipboard', async () => {
    const user = userEvent.setup();
    const onCopy = jest.fn();

    render(<CodeSnippet code="const x = 1;" onCopy={onCopy} />);
    await user.click(screen.getByRole('button', { name: 'Copy' }));

    await waitFor(() => {
      expect(onCopy).toHaveBeenCalledWith('const x = 1;');
    });
  });

  it('shows copied state after copy', async () => {
    const user = userEvent.setup();

    render(<CodeSnippet code="hello" />);
    await user.click(screen.getByRole('button', { name: 'Copy' }));

    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });

  it('falls back to execCommand when clipboard API fails', async () => {
    const user = userEvent.setup();
    const onCopy = jest.fn();
    const execCommand = jest.fn().mockReturnValue(true);

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: jest.fn().mockRejectedValue(new Error('denied')) },
    });
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: execCommand,
    });

    render(<CodeSnippet code="fallback copy" onCopy={onCopy} />);
    await user.click(screen.getByRole('button', { name: 'Copy' }));

    await waitFor(() => {
      expect(execCommand).toHaveBeenCalledWith('copy');
      expect(onCopy).toHaveBeenCalledWith('fallback copy');
    });
  });
});
