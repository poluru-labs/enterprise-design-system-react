import { render, screen } from '@testing-library/react';
import { DescriptionList } from './DescriptionList.js';

describe('DescriptionList', () => {
  it('renders items', () => {
    render(
      <DescriptionList
        items={[
          { term: 'Name', description: 'Enterprise DS' },
          { term: 'Version', description: '1.0.0' },
        ]}
      />,
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Enterprise DS')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <DescriptionList>
        <dt>Status</dt>
        <dd>Active</dd>
      </DescriptionList>,
    );
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('sets column css variable', () => {
    const { container } = render(
      <DescriptionList items={[{ term: 'A', description: 'B' }]} columns={2} />,
    );
    expect(container.firstChild).toHaveStyle({ '--eds-dl-columns': '2' });
  });
});
