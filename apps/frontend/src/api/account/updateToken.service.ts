import { ErrorResponse } from '../../types/accounts/error.types';
import {
  UpdateTokenParams,
  UpdateTokenResponse,
} from '../../types/accounts/update-token.types';
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
    ErrorResponse,
    UpdateTokenParams
  >,
) => useMutation(updateToken, options);
