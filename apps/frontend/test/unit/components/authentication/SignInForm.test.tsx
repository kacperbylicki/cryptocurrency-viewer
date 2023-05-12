import { AuthContext } from '../../../../src/context/AuthContext';
import { SignInForm } from '../../../../src/components/authentication/SignInForm';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

describe('SignInForm', () => {
  it('renders the SignInForm component', async () => {
    const authContextMock = {
      setActiveSignInForm: vi.fn(),
      setActiveRegisterForm: vi.fn(),
      handleLogin: vi.fn(),
      activeRegisterForm: false,
      activeSignInForm: false,
      handleLogout: vi.fn(),
      handleRegister: vi.fn(),
      handleRefreshToken: vi.fn(),
    };

    const { container } = render(
      <AuthContext.Provider value={authContextMock}>
        <SignInForm />
      </AuthContext.Provider>,
    );

    expect(container.querySelector('.sign-in')).toBeInTheDocument();
    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('Sign into Your account')).toBeInTheDocument();
  });

  it('closes the sign-in form', async () => {
    const authContextMock = {
      setActiveSignInForm: vi.fn(),
      setActiveRegisterForm: vi.fn(),
      handleLogin: vi.fn(),
      activeRegisterForm: false,
      activeSignInForm: true,
      handleLogout: vi.fn(),
      handleRegister: vi.fn(),
      handleRefreshToken: vi.fn(),
    };

    render(
      <AuthContext.Provider value={authContextMock}>
        <SignInForm />
      </AuthContext.Provider>,
    );

    const closeButton = screen.getByRole('sign-in-close-btn');
    fireEvent.click(closeButton);
    expect(authContextMock.setActiveSignInForm).toHaveBeenCalledWith(false);
  });

  it('redirects to the register form', async () => {
    const authContextMock = {
      setActiveSignInForm: vi.fn(),
      setActiveRegisterForm: vi.fn(),
      handleLogin: vi.fn(),
      activeRegisterForm: false,
      activeSignInForm: true,
      handleLogout: vi.fn(),
      handleRegister: vi.fn(),
      handleRefreshToken: vi.fn(),
    };

    render(
      <AuthContext.Provider value={authContextMock}>
        <SignInForm />
      </AuthContext.Provider>,
    );

    const createAccountLink = screen.getByText(/create/i);
    fireEvent.click(createAccountLink);
    expect(authContextMock.setActiveRegisterForm).toHaveBeenCalledWith(true);
    expect(authContextMock.setActiveSignInForm).toHaveBeenCalledWith(false);
  });

  it('input fields work properly', async () => {
    const authContextMock = {
      setActiveSignInForm: vi.fn(),
      setActiveRegisterForm: vi.fn(),
      handleLogin: vi.fn(),
      activeRegisterForm: false,
      activeSignInForm: true,
      handleLogout: vi.fn(),
      handleRegister: vi.fn(),
      handleRefreshToken: vi.fn(),
    };

    render(
      <AuthContext.Provider value={authContextMock}>
        <SignInForm />
      </AuthContext.Provider>,
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.focus(emailInput);
    expect(emailInput).toHaveAttribute('placeholder', '');
    fireEvent.blur(emailInput);
    expect(emailInput).toHaveAttribute('placeholder', 'Email');

    fireEvent.focus(passwordInput);
    expect(passwordInput).toHaveAttribute('placeholder', '');
    fireEvent.blur(passwordInput);
    expect(passwordInput).toHaveAttribute('placeholder', 'Password');
  });

  it('submitting the sign-in form', async () => {
    const authContextMock = {
      setActiveSignInForm: vi.fn(),
      setActiveRegisterForm: vi.fn(),
      handleLogin: vi.fn(),
      activeRegisterForm: false,
      activeSignInForm: true,
      handleLogout: vi.fn(),
      handleRegister: vi.fn(),
      handleRefreshToken: vi.fn(),
    };

    render(
      <AuthContext.Provider value={authContextMock}>
        <SignInForm />
      </AuthContext.Provider>,
    );

    const form = screen.getByRole('sign-in-form');
    fireEvent.submit(form);
    expect(authContextMock.handleLogin).toHaveBeenCalled();
  });
});
