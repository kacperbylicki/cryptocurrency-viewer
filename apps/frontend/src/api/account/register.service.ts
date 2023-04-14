import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/accounts/error';
import {
  RegisterParams,
  RegisterResponse,
} from '../../types/accounts/register';
import { UseMutationOptions, useMutation } from 'react-query';
import { axiosInstance } from '../axiosInstance';

export const register = (params: RegisterParams): Promise<RegisterResponse> =>
  axiosInstance
    .post('/accounts/register', params)
    .then((response) => response.data);

export const useRegisterMutation = (
  options?: UseMutationOptions<
    RegisterResponse,
    AxiosError<ErrorResponse>,
    RegisterParams
  >,
) => useMutation(register, options);
