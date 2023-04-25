import { ErrorResponse } from '../../types/accounts/error.types';
import { LoginPayload, LoginResponse } from '../../types/accounts/login.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { axiosInstance } from '../axiosInstance';

export const login = async (params: LoginPayload): Promise<LoginResponse> => {
  try {
    const { data } = await axiosInstance.post('/accounts/login', params);
    return data;
  } catch (error: unknown) {
    const status = (error as ErrorResponse)?.status || 500;
    return { data: null, status };
  }
};

export const useLoginMutation = (
  options?: UseMutationOptions<LoginResponse, ErrorResponse, LoginPayload>,
) => useMutation(login, options);
