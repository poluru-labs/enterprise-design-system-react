import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline.js';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  args: {
    items: [
      { title: 'Order placed', description: 'Your order was received.', timestamp: 'Jan 12, 9:00 AM', status: 'complete' },
      { title: 'In transit', description: 'Package is on the way.', timestamp: 'Jan 13, 2:00 PM', status: 'current' },
      { title: 'Delivered', timestamp: 'Estimated Jan 15', status: 'upcoming' },
    ],
  },
};
