import { ErrorResponse } from '../../types/accounts/error.types';
import { LoginParams, LoginResponse } from '../../types/accounts/login.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { axiosInstance } from '../axiosInstance';

export const login = (params: LoginParams): Promise<LoginResponse> =>
  axiosInstance
    .post('/accounts/login', params)
    .then((response) => response.data);

export const useLoginMutation = (
  options?: UseMutationOptions<LoginResponse, ErrorResponse, LoginParams>,
) => useMutation(login, options);
