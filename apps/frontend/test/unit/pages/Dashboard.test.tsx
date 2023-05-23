import { AuthContext } from '../../../src/context/AuthContext';
import { Dashboard } from '../../../src/pages/Dashboard';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

const queryClient = new QueryClient();

const mockUser = {
  uuid: 'test',
  email: 'testuser@gmail.com',
  username: 'testuser',
  iat: 1,
  exp: 1,
};

const mockLoggedInUser = {
  handleLogin: vi.fn(),
  handleRegister: vi.fn(),
  handleRefreshToken: vi.fn(),
  user: mockUser,
  accessToken: 'testAccessToken',
  refreshToken: 'testRefreshToken',
  setActiveRegisterForm: vi.fn(),
  activeRegisterForm: false,
  setActiveSignInForm: vi.fn(),
  activeSignInForm: false,
  handleLogout: vi.fn(),
};

const mockNotLoggedInUser = {
  handleLogin: vi.fn(),
  handleRegister: vi.fn(),
  handleRefreshToken: vi.fn(),
  accessToken: '',
  refreshToken: '',
  setActiveRegisterForm: vi.fn(),
  activeRegisterForm: false,
  setActiveSignInForm: vi.fn(),
  activeSignInForm: false,
  handleLogout: vi.fn(),
};

describe('Dashboard', () => {
  it('renders welcome text for a logged-in user', async () => {
    render(
      <Router>
        <AuthContext.Provider value={mockLoggedInUser}>
          <QueryClientProvider client={queryClient}>
            <Dashboard />
          </QueryClientProvider>
        </AuthContext.Provider>
      </Router>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(`Welcome ${mockUser.username}`),
      ).toBeInTheDocument();
    });
  });

  it('renders AbbreviatedStatistics', async () => {
    render(
      <Router>
        <AuthContext.Provider value={mockNotLoggedInUser}>
          <QueryClientProvider client={queryClient}>
            <Dashboard />
          </QueryClientProvider>
        </AuthContext.Provider>
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText('Welcome')).toBeInTheDocument();
      const abbreviatedStatisticsElements = screen.getAllByRole(
        'abbreviated-statistics',
      );
      expect(abbreviatedStatisticsElements).toHaveLength(10);

      abbreviatedStatisticsElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    });
  });

  it('renders NewsDashboard', () => {
    render(
      <Router>
        <AuthContext.Provider value={mockNotLoggedInUser}>
          <QueryClientProvider client={queryClient}>
            <Dashboard />
          </QueryClientProvider>
        </AuthContext.Provider>
      </Router>,
    );

    expect(screen.getByRole('crypto-news-dashboard')).toBeInTheDocument();
  });
});
