import { render, screen } from '@testing-library/react';
import { Timeline } from './Timeline.js';

describe('Timeline', () => {
  it('renders timeline items', () => {
    render(
      <Timeline
        items={[
          { title: 'Order placed', timestamp: '9:00 AM' },
          { title: 'Shipped', timestamp: '2:00 PM' },
        ]}
      />,
    );
    expect(screen.getByText('Order placed')).toBeInTheDocument();
    expect(screen.getByText('Shipped')).toBeInTheDocument();
  });

  it('renders descriptions', () => {
    render(<Timeline items={[{ title: 'Step', description: 'Details here' }]} />);
    expect(screen.getByText('Details here')).toBeInTheDocument();
  });

  it('uses explicit status', () => {
    const { container } = render(
      <Timeline items={[{ title: 'Done', status: 'complete' }]} />,
    );
    expect(container.querySelector('[class*="complete"]')).toBeTruthy();
  });
});
