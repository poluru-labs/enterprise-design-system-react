import { fireEvent, render, screen } from '@testing-library/react';
import { Avatar } from './Avatar.js';

describe('Avatar', () => {
  it('renders initials from name', () => {
    render(<Avatar name="Jane Doe" />);
    expect(screen.getByLabelText('Jane Doe')).toHaveTextContent('JD');
  });

  it('renders question mark when name is empty', () => {
    render(<Avatar />);
    expect(screen.getByLabelText('Avatar')).toHaveTextContent('?');
  });

  it('uses alt for accessible label', () => {
    render(<Avatar alt="Profile photo" src="/avatar.png" />);
    expect(screen.getByLabelText('Profile photo')).toBeInTheDocument();
  });

  it('falls back to initials when image fails to load', () => {
    render(<Avatar name="Sam Lee" src="/broken.png" />);
    fireEvent.error(screen.getByRole('img').querySelector('img')!);
    expect(screen.getByLabelText('Sam Lee')).toHaveTextContent('SL');
  });
});
