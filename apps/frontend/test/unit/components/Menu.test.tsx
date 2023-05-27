import { AuthContext } from '../../../src/context/AuthContext';
import { Menu } from '../../../src/components/Menu';
import { MemoryRouter as Router } from 'react-router-dom';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

const mockAuthContext = {
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

describe('Menu component', () => {
  it('toggles activeMenu state when menu icon is clicked', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <Router>
          <Menu width={1024} />
        </Router>
      </AuthContext.Provider>,
    );

    const menuIcon = screen.getByRole('menu-icon');
    fireEvent.click(menuIcon);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('displays the user authentication form when the Sign In button is clicked', () => {
    const setActiveSignInForm = vi.fn();
    render(
      <AuthContext.Provider value={{ ...mockAuthContext, setActiveSignInForm }}>
        <Router>
          <Menu width={1024} />
        </Router>
      </AuthContext.Provider>,
    );

    const signInButton = screen.getByRole('sign-in-button');
    fireEvent.click(signInButton);
    expect(setActiveSignInForm).toHaveBeenCalled();
  });

  it('displays the user registration form when the Create an Account button is clicked', () => {
    const setActiveRegisterForm = vi.fn();
    render(
      <AuthContext.Provider
        value={{ ...mockAuthContext, setActiveRegisterForm }}>
        <Router>
          <Menu width={1024} />
        </Router>
      </AuthContext.Provider>,
    );

    const createAccountButton = screen.getByRole('create-an-account-button');
    fireEvent.click(createAccountButton);
    expect(setActiveRegisterForm).toHaveBeenCalled();
  });
});
