import { AbbreviatedStatistics } from '../../../../src/components/dashboard/AbbreviatedStatistics';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('AbbreviatedStatistics', () => {
  const props = {
    name: 'Bitcoin',
    price: '45000',
    symbol: 'BTC',
    iconUrl: 'https://example.com/bitcoin-icon.png',
    change: '-2.5',
    rank: 1,
  };

  it('renders the component with correct data', () => {
    render(<AbbreviatedStatistics {...props} />);

    const nameElement = screen.getByText('Bitcoin BTC');
    expect(nameElement).toBeInTheDocument();

    const priceElement = screen.getByText('$45000');
    expect(priceElement).toBeInTheDocument();

    const rankElement = screen.getByText('Rank');
    expect(rankElement).toBeInTheDocument();
  });

  it('renders the component with down arrow when change is negative', () => {
    const propsWithNegativeChange = { ...props, change: '-2.5' };
    render(<AbbreviatedStatistics {...propsWithNegativeChange} />);

    const arrowDownElement = screen.getByRole('arrow-down');
    expect(arrowDownElement).toBeInTheDocument();
  });
});
