import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/accounts/error';
import { LogoutResponse } from '../../types/accounts/logout';
import { UseMutationOptions, useMutation } from 'react-query';
import { axiosInstance } from '../axiosInstance';

export const logout = (accessToken: string): Promise<LogoutResponse> =>
  axiosInstance
    .post('/accounts/logout', null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => response.data);

export const useLogoutMutation = (
  accessToken: string,
  options?: UseMutationOptions<LogoutResponse, AxiosError<ErrorResponse>>,
) => useMutation(() => logout(accessToken), options);
