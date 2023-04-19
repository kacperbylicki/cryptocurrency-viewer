import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import jwt_decode from 'jwt-decode';
import { AuthContextHandler } from '../types/contexts/auth-context.types';
import { ErrorResponse } from '../types/accounts/error.types';
import { LoginParams } from '../types/accounts/login.types';
import { RegisterParams } from '../types/accounts/register.types';
import { ToastNotificationContext } from './ToastNotificationContext';
import { User } from '../types/accounts/user.types';
import { useLoginMutation } from '../api/account/login.service';
import { useLogoutMutation } from '../api/account/logout.service';
import { useRefreshTokenMutation } from '../api/account/updateToken.service';
import { useRegisterMutation } from '../api/account/register.service';

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext<AuthContextHandler>(
  {} as AuthContextHandler,
);

export function AuthProvider({ children }: AuthProviderProps) {
  const { showToastNotification } = useContext(ToastNotificationContext);
  const [activeRegisterForm, setActiveRegisterForm] = useState(false);
  const [activeSignInForm, setActiveSignInForm] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const access_token = localStorage.getItem('access_token') ?? '{}';
    const refresh_token = localStorage.getItem('refresh_token') ?? '{}';
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    setUser(user);
  }, [
    localStorage.getItem('access_token'),
    localStorage.getItem('refresh_token'),
    localStorage.getItem('user'),
  ]);

  //Login
  const { mutate: loginMutate } = useLoginMutation({
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.data.accessToken);
      localStorage.setItem('refresh_token', data.data.refreshToken);
      localStorage.setItem(
        'user',
        JSON.stringify(jwt_decode(data.data.accessToken)),
      );
      setActiveSignInForm(false);
      setActiveRegisterForm(false);
      showToastNotification('you are logged in!', 'success');
    },
    onError: (error: ErrorResponse) => {
      showToastNotification(
        error.response?.data.error[0] ?? error.message,
        'error',
      );
    },
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const loginData: LoginParams = {
      email: formData.get('email')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
    };

    await loginMutate(loginData);
  };

  //Register
  const { mutate: registerMutate } = useRegisterMutation({
    onSuccess: () => {
      showToastNotification('your account has been created!', 'success');
    },
    onError: (error: ErrorResponse) => {
      showToastNotification(
        error.response?.data.error[0] ?? error.message,
        'error',
      );
    },
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const registerData: RegisterParams = {
      email: formData.get('email')?.toString() ?? '',
      username: formData.get('username')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
      confirmPassword: formData.get('confirm_password')?.toString() ?? '',
    };

    await registerMutate(registerData);
  };

  //Update Token
  const { mutate: refreshTokenMutate } = useRefreshTokenMutation({
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.data.accessToken);
      localStorage.setItem('refresh_token', data.data.refreshToken);
      localStorage.setItem(
        'user',
        JSON.stringify(jwt_decode(data.data.accessToken)),
      );
    },
    onError: (error: ErrorResponse) => {
      showToastNotification(
        error.response?.data.error[0] ?? error.message,
        'error',
      );
    },
  });

  const handleRefreshToken = async () => {
    await refreshTokenMutate({
      refreshToken: refreshToken,
    });
  };

  //Logout
  const { mutate: logout } = useLogoutMutation(accessToken);
  const handleLogout = async () => {
    await logout();
    localStorage.setItem('access_token', '{}');
    localStorage.setItem('refresh_token', '{}');
    localStorage.setItem('user', '');
    showToastNotification('you have been logged out!', 'success');
  };

  const contextData = {
    handleLogin,
    setActiveRegisterForm,
    activeRegisterForm,
    setActiveSignInForm,
    activeSignInForm,
    handleLogout,
    handleRegister,
    handleRefreshToken,
    refreshToken,
    accessToken,
    user,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}
