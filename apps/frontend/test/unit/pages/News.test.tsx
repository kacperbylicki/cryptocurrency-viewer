import { Loader } from '../../../src/components/Loader';
import { News } from '../../../src/pages/News';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { SelectedCryptocurrencyContext } from '../../../src/context/SelectedCryptocurrencyContext';
import { ToastNotificationContext } from '../../../src/context/ToastNotificationContext';
import { describe, it, vi } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { render, screen, waitFor } from '@testing-library/react';

const queryClient = new QueryClient();

const mockHandleSelectCryptocurrency = vi.fn();
const mockShowToastNotification = vi.fn();

const mockContextValue = {
  handleSelectCryptocurrency: mockHandleSelectCryptocurrency,
  activeUuid: 'exampleActiveUuid',
  newsCategory: 'exampleNewsCategory',
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
          <Router>{component}</Router>
        </SelectedCryptocurrencyContext.Provider>
      </ToastNotificationContext.Provider>
    </QueryClientProvider>,
  );
};

describe('News', () => {
  it('renders the loading state correctly', () => {
    renderWithProviders(<Loader />);
    const loadingIndicator = screen.getByRole('loader');
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('renders the component with correct data', async () => {
    renderWithProviders(<News />);

    const headerElement = screen.getByRole('search-and-header-wrapper');
    expect(headerElement).toBeInTheDocument();

    const selectElement = screen.getByRole('search-cryptocurrency');
    expect(selectElement).toBeInTheDocument();

    await waitFor(() => {
      const newsElements = screen.getAllByRole('search-cryptocurrency-option');
      expect(newsElements.length).toBeGreaterThan(0);
    });
  });

  it('renders the component with empty news information', async () => {
    renderWithProviders(<News />);

    await waitFor(() => {
      const emptyNewsElement = screen.queryByText(
        'We currently do not have any news',
      );
      expect(emptyNewsElement).toBeInTheDocument();
    });
  });

  it('handles cryptocurrency selection', async () => {
    renderWithProviders(<News />);
    await waitFor(() => {
      expect(screen.getByRole('search-cryptocurrency')).toBeInTheDocument();
      fireEvent.change(screen.getByRole('search-cryptocurrency'), {
        target: { value: 'Bitcoin//Qwsogvtv82FCd' },
      });
      expect(mockHandleSelectCryptocurrency).toHaveBeenCalledWith(
        'Bitcoin//Qwsogvtv82FCd',
      );
    });
  });
});
