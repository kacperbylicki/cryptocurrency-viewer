import { AuthContext } from '../../context/AuthContext';
import { ErrorResponse } from '../../types/accounts/error.types';
import { LoginPayload, LoginResponse } from '../../types/accounts/login.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';
import { useContext } from 'react';

export const useLoginMutation = (
  options?: UseMutationOptions<LoginResponse, ErrorResponse, LoginPayload>,
) => {
  const { handleRefreshToken } = useContext(AuthContext);
  const axiosInstance = createAxiosInstance(handleRefreshToken);

  const login = async (params: LoginPayload): Promise<LoginResponse> => {
    try {
      const { data } = await axiosInstance.post('/accounts/login', params);
      return data;
    } catch (error: unknown) {
      const status = (error as ErrorResponse)?.status || 500;
      return { data: null, status };
    }
  };

  return useMutation(login, options);
};
