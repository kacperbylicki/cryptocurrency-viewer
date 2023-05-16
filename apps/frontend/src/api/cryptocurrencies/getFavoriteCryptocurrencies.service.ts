import { AuthContext } from '../../context/AuthContext';
import { ErrorResponse } from '../../types/accounts/error.types';
import { GetFavouriteCryptocurrencyResponse } from '../../types/cryptocurrencies/favouriteCryptocurrencies.types';
import { createAxiosInstance } from '../axiosInstance';
import { useContext } from 'react';
import { useQuery } from 'react-query';

export const useGetFavouriteCryptocurrenciesQuery = (
  accessToken: string,
  queryKey: string,
) => {
  const { handleRefreshToken } = useContext(AuthContext);
  const axiosInstance = createAxiosInstance(handleRefreshToken);

  const getFavouriteCryptocurrencies = async () => {
    try {
      const { data } = await axiosInstance.get(`/cryptocurrencies/favorite`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (error: unknown) {
      const status = (error as ErrorResponse)?.status || 500;
      return { data: null, status };
    }
  };

  const query = useQuery<GetFavouriteCryptocurrencyResponse, ErrorResponse>(
    queryKey,
    getFavouriteCryptocurrencies,
    {
      enabled: !!accessToken,
    },
  );

  return { ...query, refetch: query.refetch };
};
