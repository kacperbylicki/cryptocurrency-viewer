import React, { ReactNode, createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { IAuthContext } from '../types/contexts/auth-context';
import { LoginParams } from '../types/accounts/login';
import { RegisterParams } from '../types/accounts/register';
import { useLoginMutation } from '../api/account/login.service';
import { useLogoutMutation } from '../api/account/logout.service';
import { useRefreshTokenMutation } from '../api/account/updateToken.service';
import { useRegisterMutation } from '../api/account/register.service';

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: AuthProviderProps) {
  const [activeRegisterForm, setActiveRegisterForm] = useState(false);
  const [activeSignInForm, setActiveSignInForm] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const access_token = localStorage.getItem('access_token') ?? '';
    const refresh_token = localStorage.getItem('refresh_token') ?? '';
    const user = localStorage.getItem('user') ?? '';

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
      console.log('Success');
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
    localStorage.setItem('access_token', '');
    localStorage.setItem('refresh_token', '');
    localStorage.setItem('user', '');
    console.log('You have been logged out');
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
