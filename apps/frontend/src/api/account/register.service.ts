import { ErrorResponse } from '../../types/accounts/error.types';
import {
  RegisterPayload,
  RegisterResponse,
} from '../../types/accounts/register.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { axiosInstance } from '../axiosInstance';

export const register = async (
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

export const useRegisterMutation = (
  options?: UseMutationOptions<
    RegisterResponse,
    ErrorResponse,
    RegisterPayload
  >,
) => useMutation(register, options);
