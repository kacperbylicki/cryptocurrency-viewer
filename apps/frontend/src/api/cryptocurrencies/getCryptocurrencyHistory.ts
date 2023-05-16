import { AuthContext } from '../../context/AuthContext';
import { CryptocurrencyHistoryResponse } from '../../types/cryptocurrencies/cryptocurrencyHistory.types';
import { ErrorResponse } from '../../types/accounts/error.types';
import { createAxiosInstance } from '../axiosInstance';
import { useContext } from 'react';
import { useQuery } from 'react-query';

export const useGetCryptocurrencyHistoryQuery = (
  uuid: string,
  timePeriod: string,
) => {
  const { handleRefreshToken } = useContext(AuthContext);
  const axiosInstance = createAxiosInstance(handleRefreshToken);

  const getCryptocurrencyHistory = async (
    uuid: string,
    timePeriod: string,
  ): Promise<CryptocurrencyHistoryResponse> => {
    try {
      const queryParams = new URLSearchParams({
        timePeriod,
      }).toString();

      const { data } = await axiosInstance.get(
        `/cryptocurrencies/${uuid}/history?${queryParams}`,
      );
      return data;
    } catch (error: unknown) {
      const status = (error as ErrorResponse)?.status || 500;
      return { data: null, status };
    }
  };

  return useQuery<CryptocurrencyHistoryResponse, ErrorResponse>(
    ['getCryptocurrencyHistory', uuid, timePeriod],
    () => getCryptocurrencyHistory(uuid, timePeriod),
  );
};
