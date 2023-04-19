import { ErrorResponse } from '../../types/accounts/error.types';
import {
  RegisterParams,
  RegisterResponse,
} from '../../types/accounts/register.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { axiosInstance } from '../axiosInstance';

export const register = (params: RegisterParams): Promise<RegisterResponse> =>
  axiosInstance
    .post('/accounts/register', params)
    .then((response) => response.data);

export const useRegisterMutation = (
  options?: UseMutationOptions<RegisterResponse, ErrorResponse, RegisterParams>,
) => useMutation(register, options);
