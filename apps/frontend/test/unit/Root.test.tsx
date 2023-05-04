import { Root } from '../../src/Root';
import { ToastNotificationContext } from '../../src/context/ToastNotificationContext';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

describe('Root component', () => {
  it('renders menu', () => {
    render(<Root />);
    const menuElement = screen.getByRole('menu');
    expect(menuElement).toBeInTheDocument();
  });

  it('does not render toast notification when there is no active notification', () => {
    render(
      <ToastNotificationContext.Provider
        value={{
          activeToastNotification: false,
          toastNotificationType: 'error',
          toastNotificationContent: 'something went wrong!',
          showToastNotification: vi.fn(),
        }}>
        <Root />
      </ToastNotificationContext.Provider>,
    );
    const toastNotificationElement = screen.queryByRole('toast-notification');
    expect(toastNotificationElement).not.toBeInTheDocument();
  });

  it('renders toast notification when there is an active notification', () => {
    render(
      <ToastNotificationContext.Provider
        value={{
          activeToastNotification: true,
          toastNotificationType: 'success',
          toastNotificationContent: 'successfully logged in!',
          showToastNotification: vi.fn(),
        }}>
        <Root />
      </ToastNotificationContext.Provider>,
    );
    const toastNotificationElement = screen.getByRole('toast-notification');
    expect(toastNotificationElement).toBeInTheDocument();
  });
});
