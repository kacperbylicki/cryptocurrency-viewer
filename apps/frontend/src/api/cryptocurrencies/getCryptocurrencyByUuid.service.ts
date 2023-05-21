import { AuthContext } from '../../context/AuthContext';
import { CryptocurrencyByUuidResponse } from '../../types/cryptocurrencies/cryptocurrencies.types';
import { ErrorResponse } from '../../types/accounts/error.types';
import { createAxiosInstance } from '../axiosInstance';
import { useContext } from 'react';
import { useQuery } from 'react-query';

export const useGetCryptocurrencyByUuidQuery = (
  uuid: string,
  timePeriod: string,
) => {
  const { handleRefreshToken } = useContext(AuthContext);
  const axiosInstance = createAxiosInstance(handleRefreshToken);

  const getCryptocurrencyByUuid = async (
    uuid: string,
    timePeriod: string,
  ): Promise<CryptocurrencyByUuidResponse> => {
    try {
      const queryParams = new URLSearchParams({
        timePeriod,
      }).toString();

      const { data } = await axiosInstance.get(
        `/cryptocurrencies/${uuid}?${queryParams}`,
      );
      return data;
    } catch (error: unknown) {
      const status = (error as ErrorResponse)?.status || 500;
      return { data: null, status };
    }
  };

  return useQuery<CryptocurrencyByUuidResponse, ErrorResponse>(
    ['getCryptocurrencyByUuid', uuid, timePeriod],
    () => getCryptocurrencyByUuid(uuid, timePeriod),
  );
};
