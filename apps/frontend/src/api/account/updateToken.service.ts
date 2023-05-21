import { AuthContext } from '../../context/AuthContext';
import { ErrorResponse } from '../../types/accounts/error.types';
import {
  UpdateTokenPayload,
  UpdateTokenResponse,
} from '../../types/accounts/update-token.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';
import { useContext } from 'react';

export const useRefreshTokenMutation = (
  options?: UseMutationOptions<
    UpdateTokenResponse,
    ErrorResponse,
    UpdateTokenPayload
  >,
) => {
  const { handleRefreshToken } = useContext(AuthContext);
  const axiosInstance = createAxiosInstance(handleRefreshToken);

  const updateToken = async (
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

  return useMutation(updateToken, options);
};
