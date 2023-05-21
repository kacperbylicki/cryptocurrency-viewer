import { ErrorResponse } from '../../types/accounts/error.types';
import {
  RegisterPayload,
  RegisterResponse,
} from '../../types/accounts/register.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';

export const useRegisterMutation = (
  handleRefreshToken: () => Promise<void>,
  options?: UseMutationOptions<
    RegisterResponse,
    ErrorResponse,
    RegisterPayload
  >,
) => {
  const axiosInstance = createAxiosInstance(handleRefreshToken);

  const register = async (
    params: RegisterPayload,
  ): Promise<RegisterResponse> => {
    try {
      const status = await axiosInstance.post('/accounts/register', params);
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

  return useMutation(register, options);
};
