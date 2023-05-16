import { AuthContext } from '../../context/AuthContext';
import { CryptocurrenciesResponse } from '../../types/cryptocurrencies/cryptocurrencies.types';
import { ErrorResponse } from '../../types/accounts/error.types';
import { createAxiosInstance } from '../axiosInstance';
import { useContext } from 'react';
import { useQuery } from 'react-query';

export const useCryptocurrenciesQuery = (
  timePeriod: string,
  tiers: number,
  orderBy: string,
  orderDirection: string,
  limit: number,
  offset: number,
) => {
  const { handleRefreshToken } = useContext(AuthContext);
  const axiosInstance = createAxiosInstance(handleRefreshToken);

  const getCryptocurrencies = async (
    timePeriod: string,
    tiers: number,
    orderBy: string,
    orderDirection: string,
    limit: number,
    offset: number,
  ): Promise<CryptocurrenciesResponse> => {
    try {
      const queryParams = new URLSearchParams({
        timePeriod,
        tiers: tiers.toString(),
        orderBy,
        orderDirection,
        limit: limit.toString(),
        offset: offset.toString(),
      }).toString();

      const { data } = await axiosInstance.get(
        `/cryptocurrencies?${queryParams}`,
      );
      return data;
    } catch (error: unknown) {
      const status = (error as ErrorResponse)?.status || 500;
      return { data: null, status };
    }
  };

  return useQuery<CryptocurrenciesResponse, ErrorResponse>(
    [
      'getCryptocurrencies',
      timePeriod,
      tiers,
      orderBy,
      orderDirection,
      limit,
      offset,
    ],
    () =>
      getCryptocurrencies(
        timePeriod,
        tiers,
        orderBy,
        orderDirection,
        limit,
        offset,
      ),
  );
};
