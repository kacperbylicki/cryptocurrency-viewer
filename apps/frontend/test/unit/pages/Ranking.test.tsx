import { AuthContext } from '../../../src/context/AuthContext';
import { Loader } from '../../../src/components/Loader';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Ranking } from '../../../src/pages/Ranking';
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
            <Router>{component}</Router>,
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
      'Bitcoin//Qwsogvtv82FCd',
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
        'This option is available for logged in users',
        'error',
      );
    });
  });
});
