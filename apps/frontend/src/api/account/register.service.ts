import { AuthContext } from '../../context/AuthContext';
import { ErrorResponse } from '../../types/accounts/error.types';
import {
  RegisterPayload,
  RegisterResponse,
} from '../../types/accounts/register.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';
import { useContext } from 'react';

export const useRegisterMutation = (
  options?: UseMutationOptions<
    RegisterResponse,
    ErrorResponse,
    RegisterPayload
  >,
) => {
  const { handleRefreshToken } = useContext(AuthContext);
  const axiosInstance = createAxiosInstance(handleRefreshToken);

  const register = async (
    params: RegisterPayload,
  ): Promise<RegisterResponse> => {
    try {
      const status = await axiosInstance.post('/accounts/register', params);
      return status;
    } catch (error: unknown) {
      const status = (error as ErrorResponse)?.status || 500;
      return { status };
    }
  };

  return useMutation(register, options);
};
