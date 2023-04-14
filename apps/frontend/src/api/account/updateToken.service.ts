import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/accounts/error';
import {
  UpdateTokenParams,
  UpdateTokenResponse,
} from '../../types/accounts/update-token';
import { UseMutationOptions, useMutation } from 'react-query';
import { axiosInstance } from '../axiosInstance';

export const updateToken = (
  params: UpdateTokenParams,
): Promise<UpdateTokenResponse> =>
  axiosInstance
    .post('/accounts/refresh-token', params)
    .then((response) => response.data);

export const useRefreshTokenMutation = (
  options?: UseMutationOptions<
    UpdateTokenResponse,
    AxiosError<ErrorResponse>,
    UpdateTokenParams
  >,
) => useMutation(updateToken, options);
