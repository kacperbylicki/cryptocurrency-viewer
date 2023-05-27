import { QueryClient, QueryClientProvider } from 'react-query';
import { Root } from '../../src/Root';
import { ToastNotificationContext } from '../../src/context/ToastNotificationContext';
import { describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

const queryClient = new QueryClient();

vi.mock('react-lottie', () => {
  return {
    default: vi.fn(),
    LottieOptions: vi.fn(),
  };
});

describe('Root component', () => {
  it('renders menu', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>,
    );
    const menuElement = screen.getByRole('menu');
    expect(menuElement).toBeInTheDocument();
  });

  it('does not render toast notification when there is no active notification', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ToastNotificationContext.Provider
          value={{
            activeToastNotification: false,
            toastNotificationType: 'error',
            toastNotificationContent: 'something went wrong!',
            showToastNotification: vi.fn(),
          }}>
          <Root />
        </ToastNotificationContext.Provider>
      </QueryClientProvider>,
    );
    const toastNotificationElement = screen.queryByRole('toast-notification');
    expect(toastNotificationElement).not.toBeInTheDocument();
  });

  it('renders toast notification when there is an active notification', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ToastNotificationContext.Provider
          value={{
            activeToastNotification: true,
            toastNotificationType: 'success',
            toastNotificationContent: 'successfully logged in!',
            showToastNotification: vi.fn(),
          }}>
          <Root />
        </ToastNotificationContext.Provider>
      </QueryClientProvider>,
    );
    const toastNotificationElement = screen.getByRole('toast-notification');
    expect(toastNotificationElement).toBeInTheDocument();
  });
});
