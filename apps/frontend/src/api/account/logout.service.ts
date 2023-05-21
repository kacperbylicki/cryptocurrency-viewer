import { ErrorResponse } from '../../types/accounts/error.types';
import { LogoutResponse } from '../../types/accounts/logout.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';

export const useLogoutMutation = (
  handleRefreshToken: () => Promise<void>,
  accessToken: string,
  options?: UseMutationOptions<LogoutResponse, ErrorResponse>,
) => {
  const axiosInstance = createAxiosInstance(handleRefreshToken);

  const logout = async (accessToken: string): Promise<LogoutResponse> => {
    try {
      const status = await axiosInstance.post('/accounts/logout', null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return status;
    } catch (error: unknown) {
      const errorData = (error as ErrorResponse)?.response?.data;
      if (errorData?.error) {
        const errorMessage = errorData.error[0];
        throw new Error(errorMessage);
      } else {
        throw new Error('Unknown error occurred');
      }
    }
  };

  return useMutation(() => logout(accessToken), options);
};
