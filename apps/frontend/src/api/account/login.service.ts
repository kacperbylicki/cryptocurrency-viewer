import { ErrorResponse } from '../../types/accounts/error.types';
import { LoginPayload, LoginResponse } from '../../types/accounts/login.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';

export const useLoginMutation = (
  handleRefreshToken: () => Promise<void>,
  options?: UseMutationOptions<LoginResponse, ErrorResponse, LoginPayload>,
) => {
  const axiosInstance = createAxiosInstance(handleRefreshToken);

  const login = async (params: LoginPayload): Promise<LoginResponse> => {
    try {
      const { data } = await axiosInstance.post('/accounts/login', params);
      return data;
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

  return useMutation(login, options);
};
