import { AuthContext } from '../../../src/context/AuthContext';
import { Loader } from '../../../src/components/Loader';
import { LoaderContext } from '../../../src/context/LoaderContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Ranking } from '../../../src/components/Ranking';
import { BrowserRouter as Router } from 'react-router-dom';
import { SelectedCryptocurrencyContext } from '../../../src/context/SelectedCryptocurrencyContext';
import { ToastNotificationContext } from '../../../src/context/ToastNotificationContext';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const queryClient = new QueryClient();

const mockHandleSelectCryptocurrency = vi.fn();
const mockShowToastNotification = vi.fn();
const mockToggleFavoriteCryptocurrencyMutation = vi.fn();

const mockContextValue = {
  handleSelectCryptocurrency: mockHandleSelectCryptocurrency,
  activeUuid: 'exampleActiveUuid',
  newsCategory: 'exampleNewsCategory',
};

const mockAuthContextValue = {
  handleLogin: vi.fn(),
  handleRegister: vi.fn(),
  handleRefreshToken: vi.fn(),
  setActiveSignInForm: vi.fn(),
  setActiveRegisterForm: vi.fn(),
  activeSignInForm: false,
  activeRegisterForm: false,
  handleLogout: vi.fn(),
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
        <AuthContext.Provider value={mockAuthContextValue}>
          <SelectedCryptocurrencyContext.Provider value={mockContextValue}>
            <LoaderContext.Provider
              value={{ activeLoader: true, setActiveLoader: vi.fn() }}>
              <Router>{component}</Router>,
            </LoaderContext.Provider>
          </SelectedCryptocurrencyContext.Provider>
        </AuthContext.Provider>
      </ToastNotificationContext.Provider>
    </QueryClientProvider>,
  );
};

describe('Ranking', () => {
  beforeEach(() => {
    mockToggleFavoriteCryptocurrencyMutation.mockClear();
  });

  it('renders the component correctly', () => {
    const { container } = renderWithProviders(<Ranking />);
    expect(container).toBeInTheDocument();
  });

  it('renders the loading state correctly', () => {
    renderWithProviders(<Loader />);
    const loadingIndicator = screen.getByRole('loader');
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('renders the list of cryptocurrencies correctly', async () => {
    renderWithProviders(<Ranking />);
    await waitFor(() => {
      expect(screen.getByRole('ranking-list')).toBeInTheDocument();
      const rankingItems = screen.getAllByRole('ranking-list-element');
      expect(rankingItems.length).toBeGreaterThan(0);
    });
  });

  it('handles clicking on a cryptocurrency item correctly', async () => {
    renderWithProviders(<Ranking />);
    await waitFor(() => {
      expect(screen.getByRole('ranking-list')).toBeInTheDocument();
      const firstRankingItem = screen.getAllByRole('ranking-list-element')[0];
      fireEvent.click(firstRankingItem);
    });

    expect(mockHandleSelectCryptocurrency).toHaveBeenCalledWith(
      'Ethereum//razxDUgYGNAdQ',
    );
  });

  it('handles error when toggling favorite cryptocurrency', async () => {
    mockToggleFavoriteCryptocurrencyMutation.mockImplementation(() => {
      throw new Error('Error toggling favorite cryptocurrency');
    });
    renderWithProviders(<Ranking />);
    await waitFor(() => {
      expect(screen.getByRole('ranking-list')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getAllByRole('favorite-icon')[0]).toBeInTheDocument();
    });

    const favoriteIcon = screen.getAllByRole('favorite-icon')[0];
    fireEvent.click(favoriteIcon);

    await waitFor(() => {
      expect(mockShowToastNotification).toHaveBeenCalledWith(
        'this option is only available to logged in users!',
        'warning',
      );
    });
  });
});
