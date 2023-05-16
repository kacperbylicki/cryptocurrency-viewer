import { AuthContext } from '../../context/AuthContext';
import { ErrorResponse } from '../../types/accounts/error.types';
import {
  FavouriteCryptocurrency,
  ToggleFavouriteCryptocurrencyResponse,
} from '../../types/cryptocurrencies/favouriteCryptocurrencies.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';
import { useContext } from 'react';

export const useToggleFavoriteCryptocurrencyMutation = (
  accessToken: string,
  options?: UseMutationOptions<
    ToggleFavouriteCryptocurrencyResponse,
    ErrorResponse,
    FavouriteCryptocurrency
  >,
) => {
  const { handleRefreshToken } = useContext(AuthContext);
  const axiosInstance = createAxiosInstance(handleRefreshToken);

  const toggleFavoriteCryptocurrency = async (
    accessToken: string,
    params: FavouriteCryptocurrency,
  ): Promise<ToggleFavouriteCryptocurrencyResponse> => {
    try {
      const { data } = await axiosInstance.put(
        '/cryptocurrencies/favorite',
        params,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return data;
    } catch (error: unknown) {
      const status = (error as ErrorResponse)?.response?.status || 500;
      throw { status };
    }
  };

  return useMutation(
    (params: FavouriteCryptocurrency) =>
      toggleFavoriteCryptocurrency(accessToken, params),
    options,
  );
};
