import { ErrorResponse } from '../../types/accounts/error.types';
import { LogoutResponse } from '../../types/accounts/logout.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { axiosInstance } from '../axiosInstance';

export const logout = async (accessToken: string): Promise<LogoutResponse> => {
  try {
    const status = await axiosInstance.post('/accounts/logout', null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return status;
  } catch (error: unknown) {
    const status = (error as ErrorResponse)?.status || 500;
    return { status };
  }
};

export const useLogoutMutation = (
  accessToken: string,
  options?: UseMutationOptions<LogoutResponse, ErrorResponse>,
) => useMutation(() => logout(accessToken), options);
