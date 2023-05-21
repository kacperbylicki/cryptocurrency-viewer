import { ErrorResponse } from '../../types/accounts/error.types';
import {
  FavouriteCryptocurrency,
  ToggleFavouriteCryptocurrencyResponse,
} from '../../types/cryptocurrencies/favouriteCryptocurrencies.types';
import { UseMutationOptions, useMutation } from 'react-query';
import { createAxiosInstance } from '../axiosInstance';

export const useToggleFavoriteCryptocurrencyMutation = (
  handleRefreshToken: () => Promise<void>,
  accessToken: string,
  options?: UseMutationOptions<
    ToggleFavouriteCryptocurrencyResponse,
    ErrorResponse,
    FavouriteCryptocurrency
  >,
) => {
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
      const errorData = (error as ErrorResponse)?.response?.data;
      if (errorData?.error) {
        throw new Error('This option is available for logged in users');
      } else {
        throw new Error('An error occurred');
      }
    }
  };

  return useMutation(
    (params: FavouriteCryptocurrency) =>
      toggleFavoriteCryptocurrency(accessToken, params),
    options,
  );
};
