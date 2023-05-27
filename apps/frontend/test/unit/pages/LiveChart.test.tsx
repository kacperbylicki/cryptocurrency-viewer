import { LiveChart } from '../../../src/pages/LiveChart';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SelectedCryptocurrencyContext } from '../../../src/context/SelectedCryptocurrencyContext';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const queryClient = new QueryClient();

const selectedCryptocurrencyContextValue = {
  activeUuid: 'Qwsogvtv82FCd',
  newsCategory: 'Bitcoin',
  handleSelectCryptocurrency: vi.fn(),
};

vi.mock('react-chartjs-2', () => ({
  default: vi.fn(),
  register: vi.fn(),
  CategoryScale: vi.fn(),
  LinearScale: vi.fn(),
  PointElement: vi.fn(),
  LineElement: vi.fn(),
  Line: vi.fn(),
  Title: vi.fn(),
  Tooltip: vi.fn(),
  Legend: vi.fn(),
}));

describe('LiveChart', () => {
  it('renders LiveChart component', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SelectedCryptocurrencyContext.Provider
          value={selectedCryptocurrencyContextValue}>
          <LiveChart />
        </SelectedCryptocurrencyContext.Provider>
      </QueryClientProvider>,
    );

    const headerElement = screen.getByRole('live-chart-header');
    expect(headerElement).toBeInTheDocument();

    const selectElement = screen.getByRole('search-chart-cryptocurrency');
    expect(selectElement).toBeInTheDocument();

    const timePeriodSelect = screen.getByRole('time-period-select');
    expect(timePeriodSelect).toBeInTheDocument();
  });

  it('selects cryptocurrency', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SelectedCryptocurrencyContext.Provider
          value={selectedCryptocurrencyContextValue}>
          <LiveChart />
        </SelectedCryptocurrencyContext.Provider>
      </QueryClientProvider>,
    );

    it('selects a cryptocurrency', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <SelectedCryptocurrencyContext.Provider
            value={selectedCryptocurrencyContextValue}>
            <LiveChart />
          </SelectedCryptocurrencyContext.Provider>
        </QueryClientProvider>,
      );

      const selectElement = screen.getByRole('search-chart-cryptocurrency');
      fireEvent.change(selectElement, {
        target: { value: 'Bitcoin//Qwsogvtv82FCd' },
      });

      expect(selectElement).toHaveValue('Bitcoin//Qwsogvtv82FCd');
    });

    const timePeriodSelect = screen.getByRole('time-period-select');
    fireEvent.change(timePeriodSelect, { target: { value: '7d' } });

    await waitFor(() => {
      expect(timePeriodSelect).toHaveValue('7d');
    });
  });
});
