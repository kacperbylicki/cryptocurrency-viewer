import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/accounts/error';
import { LoginParams, LoginResponse } from '../../types/accounts/login';
import { UseMutationOptions, useMutation } from 'react-query';
import { axiosInstance } from '../axiosInstance';

export const login = (params: LoginParams): Promise<LoginResponse> =>
  axiosInstance
    .post('/accounts/login', params)
    .then((response) => response.data);

export const useLoginMutation = (
  options?: UseMutationOptions<
    LoginResponse,
    AxiosError<ErrorResponse>,
    LoginParams
  >,
) => useMutation(login, options);
