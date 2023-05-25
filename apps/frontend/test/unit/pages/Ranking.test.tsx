import * as axiosInstance from '../../../src/api/axiosInstance';
import { AuthContext } from '../../../src/context/AuthContext';
import { AxiosInstance } from 'axios';
import { Loader } from '../../../src/components/Loader';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Ranking } from '../../../src/pages/Ranking';
import { BrowserRouter as Router } from 'react-router-dom';
import { SelectedCryptocurrencyContext } from '../../../src/context/SelectedCryptocurrencyContext';
import { ToastNotificationContext } from '../../../src/context/ToastNotificationContext';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const queryClient = new QueryClient();

const mockShowToastNotification = vi.fn();

const mockContextValue = {
  handleSelectCryptocurrency: vi.fn(),
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

describe('Ranking', () => {
  afterEach(() => {
    vi.clearAllMocks();
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
      const firstRankingItem = screen.getByRole('ranking-list-element');
      fireEvent.click(firstRankingItem);
    });

    expect(mockContextValue.handleSelectCryptocurrency).toHaveBeenCalledWith(
      'Bitcoin//Qwsogvtv82FCd',
    );
  });

  it('handles error when toggling favorite cryptocurrency', async () => {
    vi.spyOn(axiosInstance, 'createAxiosInstance').mockImplementation(
      () =>
        ({
          put: vi.fn().mockRejectedValue({
            response: {
              data: {
                error: 'unauthorized',
              },
            },
          }),
        } as unknown as AxiosInstance),
    );

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
      expect(mockShowToastNotification).toHaveBeenCalledTimes(1);
      expect(mockShowToastNotification).toHaveBeenCalledWith(
        'This option is available for logged in users',
        'error',
      );
    });
  });
});
