import { AuthContext } from '../../src/context/AuthContext';
import { AuthContextHandler } from 'src/types/contexts/auth-context.types';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SelectedCryptocurrencyContext } from '../../src/context/SelectedCryptocurrencyContext';
import { SelectedCryptocurrencyContextHandler } from 'src/types/contexts/selected-cryptocurrency-context.types';
import { ToastNotificationContext } from '../../src/context/ToastNotificationContext';
import { ToastNotificationContextHandler } from 'src/types/contexts/toast-notification.types';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

const queryClient = new QueryClient();

// Mock the NotFound component
vi.mock('../../src/pages/NotFound', async () => {
  return {
    default: () => <div>NotFound Mock</div>,
  };
});

describe('App', () => {
  it('renders children components inside AuthProvider, ToastNotificationProvider, SelectedCryptocurrencyProvider, and QueryClientProvider', () => {
    const testId = 'test-child';

    render(
      <QueryClientProvider client={queryClient}>
        <ToastNotificationContext.Provider
          value={{} as unknown as ToastNotificationContextHandler}>
          <AuthContext.Provider value={{} as unknown as AuthContextHandler}>
            <SelectedCryptocurrencyContext.Provider
              value={{} as unknown as SelectedCryptocurrencyContextHandler}>
              <div data-testid={testId}></div>
            </SelectedCryptocurrencyContext.Provider>
          </AuthContext.Provider>
        </ToastNotificationContext.Provider>
      </QueryClientProvider>,
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
