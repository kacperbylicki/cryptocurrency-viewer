import { ErrorResponse } from '../../types/accounts/error.types';
import {
  UpdateTokenPayload,
  UpdateTokenResponse,
} from '../../types/accounts/update-token.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { axiosInstance } from '../axiosInstance';

export const updateToken = async (
  params: UpdateTokenPayload,
): Promise<UpdateTokenResponse> => {
  try {
    const { data } = await axiosInstance.post(
      '/accounts/refresh-token',
      params,
    );
    return data;
  } catch (error: unknown) {
    const status = (error as ErrorResponse)?.status || 500;
    return { data: null, status };
  }
};

export const useRefreshTokenMutation = (
  options?: UseMutationOptions<
    UpdateTokenResponse,
    ErrorResponse,
    UpdateTokenPayload
  >,
) => useMutation(updateToken, options);
