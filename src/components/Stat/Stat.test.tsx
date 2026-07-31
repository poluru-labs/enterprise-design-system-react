import { render, screen } from '@testing-library/react';
import { Stat } from './Stat.js';

describe('Stat', () => {
  it('renders value and label', () => {
    render(<Stat label="Revenue" value="$12,400" />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$12,400')).toBeInTheDocument();
  });

  it('renders trend value', () => {
    render(<Stat value="98%" trend="up" trendValue="+4%" />);
    expect(screen.getByText('+4%')).toBeInTheDocument();
  });

  it('renders hint', () => {
    render(<Stat value="42" hint="Last 30 days" />);
    expect(screen.getByText('Last 30 days')).toBeInTheDocument();
  });
});
