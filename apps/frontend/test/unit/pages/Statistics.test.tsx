import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { SelectedCryptocurrencyContext } from '../../../src/context/SelectedCryptocurrencyContext';
import { Statistics } from '../../../src/pages/Statistics';
import { ToastNotificationContext } from '../../../src/context/ToastNotificationContext';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const queryClient = new QueryClient();

const mockHandleSelectCryptocurrency = vi.fn();
const mockShowToastNotification = vi.fn();

const mockContextValue = {
  handleSelectCryptocurrency: mockHandleSelectCryptocurrency,
  activeUuid: 'razxDUgYGNAdQ',
  newsCategory: 'Ethereum',
};

const mockToastNotificationContextValue = {
  showToastNotification: mockShowToastNotification,
  activeToastNotification: false,
  toastNotificationType: 'success',
  toastNotificationContent: 'example content',
};

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ToastNotificationContext.Provider
        value={mockToastNotificationContextValue}>
        <SelectedCryptocurrencyContext.Provider value={mockContextValue}>
          <Router>{component}</Router>,
        </SelectedCryptocurrencyContext.Provider>
      </ToastNotificationContext.Provider>
    </QueryClientProvider>,
  );
};

vi.mock('../../../src/api/cryptocurrencies/cryptocurrencies.service', () => {
  return {
    useCryptocurrenciesQuery: () => ({
      data: {
        data: [
          {
            uuid: 'Qwsogvtv82FCd',
            isFavorite: true,
            name: 'Bitcoin',
          },
        ],
      },
    }),
  };
});
describe('Statistics', () => {
  beforeEach(async () => {
    renderWithProviders(<Statistics />);
  });

  it('renders the header', () => {
    const headerElement = screen.getByRole('statistics-header');
    expect(headerElement).toBeInTheDocument();
  });

  it('renders the select cryptocurrency dropdown', async () => {
    await waitFor(() => {
      const selectElement = screen.getByRole('select-cryptocurrency');
      expect(selectElement).toBeInTheDocument();
    });
  });

  it('renders the price section', async () => {
    await waitFor(() => {
      const priceElement = screen.getByRole('price');
      expect(priceElement).toBeInTheDocument();
    });
  });

  it('renders the height 24h section', async () => {
    await waitFor(() => {
      const heightElement = screen.getByRole('height24h');
      expect(heightElement).toBeInTheDocument();
    });
  });

  it('renders the low 24h section', async () => {
    await waitFor(() => {
      const lowElement = screen.getByRole('low24h');
      expect(lowElement).toBeInTheDocument();
    });
  });

  it('renders the rank section', async () => {
    await waitFor(() => {
      const rankElement = screen.getByRole('rank');
      expect(rankElement).toBeInTheDocument();
    });
  });

  it('renders the live chart section', async () => {
    await waitFor(() => {
      const liveChartElement = screen.getByRole(
        'live-chart-statistics-container',
      );
      expect(liveChartElement).toBeInTheDocument();
    });
  });

  it('renders the market cap section', async () => {
    await waitFor(() => {
      const marketCapElement = screen.getByRole('market-cap');
      expect(marketCapElement).toBeInTheDocument();
    });
  });

  it('renders the percent change section', async () => {
    await waitFor(() => {
      const percentChangeElement = screen.getByRole('percent-change');
      expect(percentChangeElement).toBeInTheDocument();
    });
  });

  it('selects a cryptocurrency', async () => {
    await waitFor(() => {
      const selectElement = screen.getByRole('select-cryptocurrency');
      fireEvent.change(selectElement, {
        target: { value: 'Bitcoin//Qwsogvtv82FCd' },
      });
      expect(selectElement).toHaveValue('Bitcoin//Qwsogvtv82FCd');
    });
  });

  it('changes the time period', async () => {
    await waitFor(() => {
      const selectElement = screen.getByRole('select-percent-change');
      fireEvent.change(selectElement, { target: { value: '7d' } });
      expect(selectElement).toHaveValue('7d');
    });
  });
});
