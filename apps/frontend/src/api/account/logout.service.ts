import { AuthContext } from '../../context/AuthContext';
import { ErrorResponse } from '../../types/accounts/error.types';
import { LogoutResponse } from '../../types/accounts/logout.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';
import { useContext } from 'react';

export const useLogoutMutation = (
  accessToken: string,
  options?: UseMutationOptions<LogoutResponse, ErrorResponse>,
) => {
  const { handleRefreshToken } = useContext(AuthContext);
  const axiosInstance = createAxiosInstance(handleRefreshToken);

  const logout = async (accessToken: string): Promise<LogoutResponse> => {
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

  return useMutation(() => logout(accessToken), options);
};
