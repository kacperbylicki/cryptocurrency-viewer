import { CryptocurrencyHistoryResponse } from '../../types/cryptocurrencies/cryptocurrencyHistory.types';
import { ErrorResponse } from '../../types/accounts/error.types';
import { axiosInstance } from '../axiosInstance';
import { useQuery } from 'react-query';

export const getCryptocurrencyHistory = async (
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

export const useGetCryptocurrencyHistoryQuery = (
  uuid: string,
  timePeriod: string,
) => {
  return useQuery<CryptocurrencyHistoryResponse, ErrorResponse>(
    ['getCryptocurrencyHistory', uuid, timePeriod],
    () => getCryptocurrencyHistory(uuid, timePeriod),
  );
};
