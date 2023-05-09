import { AuthContext } from '../../../../src/context/AuthContext';
import { RegisterForm } from '../../../../src/components/authentication/RegisterForm';
import { describe, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

describe('RegisterForm', () => {
  it('should set username placeholder onFocus and onBlur', () => {
    const { getByPlaceholderText } = render(<RegisterForm />);
    const usernameInput = getByPlaceholderText('Username') as HTMLInputElement;

    fireEvent.focus(usernameInput);
    expect(usernameInput.placeholder).toBe('');

    fireEvent.blur(usernameInput);
    expect(usernameInput.placeholder).toBe('Username');
  });

  it('should set email placeholder onFocus and onBlur', () => {
    const { getByPlaceholderText } = render(<RegisterForm />);
    const emailInput = getByPlaceholderText('Email') as HTMLInputElement;

    fireEvent.focus(emailInput);
    expect(emailInput.placeholder).toBe('');

    fireEvent.blur(emailInput);
    expect(emailInput.placeholder).toBe('Email');
  });

  it('should set password placeholder onFocus and onBlur', () => {
    const { getByPlaceholderText } = render(<RegisterForm />);
    const passwordInput = getByPlaceholderText('Password') as HTMLInputElement;

    fireEvent.focus(passwordInput);
    expect(passwordInput.placeholder).toBe('');

    fireEvent.blur(passwordInput);
    expect(passwordInput.placeholder).toBe('Password');
  });

  it('should set confirm password placeholder onFocus and onBlur', () => {
    const { getByPlaceholderText } = render(<RegisterForm />);
    const confirmPasswordInput = getByPlaceholderText(
      'Confirm Password',
    ) as HTMLInputElement;

    fireEvent.focus(confirmPasswordInput);
    expect(confirmPasswordInput.placeholder).toBe('');

    fireEvent.blur(confirmPasswordInput);
    expect(confirmPasswordInput.placeholder).toBe('Confirm Password');
  });

  it('should call handleRegister on form submit', () => {
    const mockHandleRegister = vi.fn();
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider
        value={{
          handleLogin: vi.fn(),
          handleRefreshToken: vi.fn(),
          setActiveRegisterForm: vi.fn(),
          activeRegisterForm: true,
          setActiveSignInForm: vi.fn(),
          activeSignInForm: false,
          handleRegister: mockHandleRegister,
          handleLogout: vi.fn(),
        }}>
        <RegisterForm />
      </AuthContext.Provider>,
    );
    const signUpBtn = getByText('Sign up');
    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.change(usernameInput, { target: { value: 'john_doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });
    fireEvent.click(signUpBtn);

    expect(mockHandleRegister).toHaveBeenCalled();
  });

  it('should call setActiveSignInForm and setActiveRegisterForm on Sign in click', () => {
    const mockSetActiveSignInForm = vi.fn();
    const mockSetActiveRegisterForm = vi.fn();
    const { getByText } = render(
      <AuthContext.Provider
        value={{
          setActiveSignInForm: mockSetActiveSignInForm,
          setActiveRegisterForm: mockSetActiveRegisterForm,
          handleLogin: vi.fn(),
          handleRefreshToken: vi.fn(),
          activeRegisterForm: true,
          activeSignInForm: false,
          handleRegister: vi.fn(),
          handleLogout: vi.fn(),
        }}>
        <RegisterForm />
      </AuthContext.Provider>,
    );
    const signInBtn = getByText('Sign in');

    fireEvent.click(signInBtn);
    expect(mockSetActiveSignInForm).toHaveBeenCalled();
    expect(mockSetActiveRegisterForm).toHaveBeenCalled();
  });
});
