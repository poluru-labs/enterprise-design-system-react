import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './Accordion.js';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem heading="What is included?">Plans, billing, and support details.</AccordionItem>
      <AccordionItem heading="Can I cancel anytime?">Yes, you can cancel at any time.</AccordionItem>
    </Accordion>
  ),
};

export const Single: Story = {
  render: () => (
    <Accordion single>
      <AccordionItem heading="Section A">Content A</AccordionItem>
      <AccordionItem heading="Section B">Content B</AccordionItem>
    </Accordion>
  ),
};
