import { CryptocurrencyByUuidResponse } from '../../types/cryptocurrencies/cryptocurrencies.types';
import { ErrorResponse } from '../../types/accounts/error.types';
import { axiosInstance } from '../axiosInstance';
import { useQuery } from 'react-query';

export const getCryptocurrencyByUuid = async (
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

export const useGetCryptocurrencyByUuidQuery = (
  uuid: string,
  timePeriod: string,
) => {
  return useQuery<CryptocurrencyByUuidResponse, ErrorResponse>(
    ['getCryptocurrencyByUuid', uuid, timePeriod],
    () => getCryptocurrencyByUuid(uuid, timePeriod),
  );
};
