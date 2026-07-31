import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileUpload } from './FileUpload.js';

describe('FileUpload', () => {
  it('renders label and dropzone prompt', () => {
    render(<FileUpload label="Attachments" />);

    expect(screen.getByText('Attachments')).toBeInTheDocument();
    expect(screen.getByText(/Click to upload/)).toBeInTheDocument();
  });

  it('calls onChange when file is selected', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });

    render(<FileUpload onChange={onChange} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    await user.upload(input, file);

    expect(onChange).toHaveBeenCalledWith({ files: [file] });
    expect(screen.getByText('hello.txt')).toBeInTheDocument();
  });

  it('does not open dialog when disabled', async () => {
    const user = userEvent.setup();
    const clickSpy = jest.spyOn(HTMLInputElement.prototype, 'click');

    render(<FileUpload disabled />);
    await user.click(screen.getByRole('button'));

    expect(clickSpy).not.toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('shows hint text when provided', () => {
    render(<FileUpload hint="PDF only, max 10MB" />);
    expect(screen.getByText('PDF only, max 10MB')).toBeInTheDocument();
  });

  it('opens file dialog on Enter and Space', async () => {
    const user = userEvent.setup();
    const clickSpy = jest.spyOn(HTMLInputElement.prototype, 'click');

    render(<FileUpload />);
    const dropzone = screen.getByRole('button');
    dropzone.focus();
    await user.keyboard('{Enter}');
    expect(clickSpy).toHaveBeenCalled();

    clickSpy.mockClear();
    await user.keyboard(' ');
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('handles drag and drop of files', () => {
    const onChange = jest.fn();
    const file = new File(['data'], 'drop.txt', { type: 'text/plain' });

    render(<FileUpload onChange={onChange} />);
    const dropzone = screen.getByRole('button');

    fireEvent.dragOver(dropzone);
    fireEvent.dragLeave(dropzone);
    fireEvent.dragOver(dropzone);
    fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });

    expect(onChange).toHaveBeenCalledWith({ files: [file] });
    expect(screen.getByText('drop.txt')).toBeInTheDocument();
  });

  it('ignores drop when disabled', () => {
    const onChange = jest.fn();
    const file = new File(['data'], 'skip.txt', { type: 'text/plain' });

    render(<FileUpload disabled onChange={onChange} />);
    fireEvent.drop(screen.getByRole('button'), { dataTransfer: { files: [file] } });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('supports multiple files', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const files = [
      new File(['a'], 'a.txt', { type: 'text/plain' }),
      new File(['b'], 'b.txt', { type: 'text/plain' }),
    ];

    render(<FileUpload multiple onChange={onChange} />);
    expect(screen.getByText('Multiple files supported')).toBeInTheDocument();

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    await user.upload(input, files);
    expect(onChange).toHaveBeenCalledWith({ files });
  });
});
