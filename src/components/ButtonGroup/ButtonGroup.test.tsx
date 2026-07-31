import { render, screen } from '@testing-library/react';
import { Button } from '../Button/Button.js';
import { ButtonGroup } from './ButtonGroup.js';

describe('ButtonGroup', () => {
  it('renders grouped buttons', () => {
    render(
      <ButtonGroup>
        <Button>Left</Button>
        <Button>Right</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('renders child buttons', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('button', { name: 'One' })).toBeInTheDocument();
  });

  it('supports vertical orientation class', () => {
    const { container } = render(
      <ButtonGroup orientation="vertical">
        <Button>A</Button>
      </ButtonGroup>,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/vertical/);
  });
});
