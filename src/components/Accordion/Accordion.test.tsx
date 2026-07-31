import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItem } from './Accordion.js';

describe('Accordion', () => {
  it('renders accordion items', () => {
    render(
      <Accordion>
        <AccordionItem heading="First">First content</AccordionItem>
        <AccordionItem heading="Second">Second content</AccordionItem>
      </Accordion>,
    );
    expect(screen.getByRole('button', { name: 'First' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Second' })).toBeInTheDocument();
  });

  it('expands item on click', async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem heading="First">First content</AccordionItem>
      </Accordion>,
    );
    await user.click(screen.getByRole('button', { name: 'First' }));
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('First content')).toBeInTheDocument();
  });

  it('allows only one open item in single mode', async () => {
    const user = userEvent.setup();
    render(
      <Accordion single>
        <AccordionItem heading="First">First content</AccordionItem>
        <AccordionItem heading="Second">Second content</AccordionItem>
      </Accordion>,
    );
    await user.click(screen.getByRole('button', { name: 'First' }));
    await user.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true');
  });
});
