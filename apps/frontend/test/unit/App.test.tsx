import App from '../../src/App';
import { AuthContext } from '../../src/context/AuthContext';
import { AuthContextHandler } from 'src/types/contexts/auth-context.types';
import { BrowserRouter } from 'react-router-dom';
import { ToastNotificationContext } from '../../src/context/ToastNotificationContext';
import { ToastNotificationContextHandler } from 'src/types/contexts/toast-notification.types';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('App', () => {
  it('renders the Root component', async () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('renders children components inside AuthProvider and ToastNotificationProvider', () => {
    const testId = 'test-child';

    render(
      <ToastNotificationContext.Provider
        value={{} as unknown as ToastNotificationContextHandler}>
        <AuthContext.Provider value={{} as unknown as AuthContextHandler}>
          <BrowserRouter>
            <div data-testid={testId}></div>
          </BrowserRouter>
        </AuthContext.Provider>
      </ToastNotificationContext.Provider>,
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
