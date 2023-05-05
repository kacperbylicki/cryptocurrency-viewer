import { ErrorResponse } from '../../types/accounts/error.types';
import { GetFavouriteCryptocurrencyResponse } from '../../types/cryptocurrencies/favouriteCryptocurrencies.types';
import { axiosInstance } from '../axiosInstance';
import { useQuery } from 'react-query';

export const useGetFavouriteCryptocurrenciesQuery = (
  accessToken: string,
  queryKey: string,
) => {
  const query = useQuery<GetFavouriteCryptocurrencyResponse, ErrorResponse>(
    queryKey,
    () => {
      const getFavouriteCryptocurrencies = async () => {
        try {
          const { data } = await axiosInstance.get(
            `/cryptocurrencies/favorite`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );
          return data;
        } catch (error: unknown) {
          const status = (error as ErrorResponse)?.status || 500;
          return { data: null, status };
        }
      };

      return getFavouriteCryptocurrencies();
    },
    {
      enabled: !!accessToken,
    },
  );

  return { ...query, refetch: query.refetch };
};
