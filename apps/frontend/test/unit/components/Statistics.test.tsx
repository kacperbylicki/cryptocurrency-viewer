import { LoaderContext } from '../../../src/context/LoaderContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { SelectedCryptocurrencyContext } from '../../../src/context/SelectedCryptocurrencyContext';
import { Statistics } from '../../../src/components/statistics/Statistics';
import { ToastNotificationContext } from '../../../src/context/ToastNotificationContext';
import { describe, it, vi } from 'vitest';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react/pure';

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
          <LoaderContext.Provider
            value={{ activeLoader: true, setActiveLoader: vi.fn() }}>
            <Router>{component}</Router>,
          </LoaderContext.Provider>
        </SelectedCryptocurrencyContext.Provider>
      </ToastNotificationContext.Provider>
    </QueryClientProvider>,
  );
};
describe('Statistics', () => {
  beforeEach(async () => {
    renderWithProviders(<Statistics />);
  });

  it('renders the header', () => {
    const headerElement = screen.getByRole('statistics-header', {
      level: 2,
      name: 'Statistics',
    });
    expect(headerElement).toBeInTheDocument();
  });

  it('renders the select cryptocurrency dropdown', async () => {
    await waitFor(() => {
      const selectElement = screen.getByRole('select-cryptocurrency', {
        name: 'Select cryptocurrency',
      });
      expect(selectElement).toBeInTheDocument();
    });
  });

  it('renders the price section', async () => {
    await waitFor(() => {
      const priceElement = screen.getByText(/price/i);
      expect(priceElement).toBeInTheDocument();
    });
  });

  it('renders the height 24h section', async () => {
    await waitFor(() => {
      const heightElement = screen.getByText(/height 24h/i);
      expect(heightElement).toBeInTheDocument();
    });
  });

  it('renders the low 24h section', async () => {
    await waitFor(() => {
      const lowElement = screen.getByText(/low 24h/i);
      expect(lowElement).toBeInTheDocument();
    });
  });

  it('renders the rank section', async () => {
    await waitFor(() => {
      const rankElement = screen.getByText(/rank/i);
      expect(rankElement).toBeInTheDocument();
    });
  });

  it('renders the live chart section', async () => {
    await waitFor(() => {
      const liveChartElement = screen.getByText(/live chart last 24h/i);
      expect(liveChartElement).toBeInTheDocument();
    });
  });

  it('renders the market cap section', async () => {
    await waitFor(() => {
      const marketCapElement = screen.getByText(/market cap/i);
      expect(marketCapElement).toBeInTheDocument();
    });
  });

  it('renders the percent change section', async () => {
    await waitFor(() => {
      const percentChangeElement = screen.getByText(/percent change/i);
      expect(percentChangeElement).toBeInTheDocument();
    });
  });

  it('selects a cryptocurrency', async () => {
    await waitFor(() => {
      const selectElement = screen.getByRole('select-cryptocurrency', {
        name: 'Select cryptocurrency',
      });
      fireEvent.change(selectElement, { target: { value: 'Bitcoin' } });
      expect(selectElement).toHaveValue('Bitcoin');
    });
  });

  it('changes the time period', async () => {
    await waitFor(() => {
      const selectElement = screen.getByRole('select-cryptocurrency', {
        name: 'Percent change',
      });
      fireEvent.change(selectElement, { target: { value: '7d' } });
      expect(selectElement).toHaveValue('7d');
    });
  });
});
