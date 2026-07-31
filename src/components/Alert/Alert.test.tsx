import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert.js';

describe('Alert', () => {
  it('renders title and message', () => {
    render(<Alert title="Heads up" message="Something needs attention." variant="warning" />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText('Something needs attention.')).toBeInTheDocument();
  });

  it('renders children when message is not set', () => {
    render(<Alert variant="info">Custom alert body</Alert>);
    expect(screen.getByText('Custom alert body')).toBeInTheDocument();
  });

  it('dismisses when dismissible and close is clicked', async () => {
    const user = userEvent.setup();
    const onDismiss = jest.fn();

    render(<Alert title="Dismiss me" dismissible onDismiss={onDismiss} />);
    await user.click(screen.getByLabelText('Dismiss alert'));

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(onDismiss).toHaveBeenCalled();
  });

  it('hides icon when hideIcon is true', () => {
    const { container } = render(<Alert message="No icon" hideIcon />);
    expect(container.querySelector('svg')).toBeNull();
  });
});
