import { NewsDashboard } from '../../../../src/components/dashboard/NewsDashboard';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SelectedCryptocurrencyContext } from '../../../../src/context/SelectedCryptocurrencyContext';
import { describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

const queryClient = new QueryClient();

const selectedCryptocurrencyContextValue = {
  activeUuid: 'Qwsogvtv82FCd',
  newsCategory: 'Bitcoin',
  handleSelectCryptocurrency: vi.fn(),
};

const selectedEmptyCryptocurrencyContextValue = {
  activeUuid: '',
  newsCategory: '',
  handleSelectCryptocurrency: vi.fn(),
};

describe('NewsDashboard', () => {
  it('renders the component with correct data', () => {
    render(
      <SelectedCryptocurrencyContext.Provider
        value={selectedCryptocurrencyContextValue}>
        <QueryClientProvider client={queryClient}>
          <NewsDashboard />
        </QueryClientProvider>
      </SelectedCryptocurrencyContext.Provider>,
    );

    const headerElement = screen.getByRole('crypto-news-header');
    expect(headerElement).toBeInTheDocument();

    const selectElement = screen.getByRole('crypto-news-select');
    expect(selectElement).toBeInTheDocument();

    waitFor(() => {
      const newsElements = screen.getAllByRole('news-dashboard-element');
      expect(newsElements.length).toBeGreaterThan(0);

      const showAllButton = screen.getByRole('show-all-button');
      expect(showAllButton).toBeInTheDocument();
    });
  });

  it('renders the component with empty news information', () => {
    render(
      <SelectedCryptocurrencyContext.Provider
        value={selectedEmptyCryptocurrencyContextValue}>
        <QueryClientProvider client={queryClient}>
          <NewsDashboard />
        </QueryClientProvider>
      </SelectedCryptocurrencyContext.Provider>,
    );

    waitFor(() => {
      const emptyNewsElement = screen.getByText(
        'We currently do not have any news for this cryptocurrency',
      );
      expect(emptyNewsElement).toBeInTheDocument();
    });
  });

  it('renders the component with loading state', () => {
    render(
      <SelectedCryptocurrencyContext.Provider
        value={selectedCryptocurrencyContextValue}>
        <QueryClientProvider client={queryClient}>
          <NewsDashboard />
        </QueryClientProvider>
      </SelectedCryptocurrencyContext.Provider>,
    );

    const loaderElement = screen.getByRole('loader');
    expect(loaderElement).toBeInTheDocument();
  });
});
