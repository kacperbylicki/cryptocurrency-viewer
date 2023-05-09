import { ErrorResponse } from '../../types/accounts/error.types';
import { NewsResponse } from '../../types/cryptocurrencies/news.types';
import { axiosInstance } from '../axiosInstance';
import { useQuery } from 'react-query';

export const getNews = async (category: string): Promise<NewsResponse> => {
  try {
    const queryParams = new URLSearchParams({
      category,
      limit: '50',
      offset: '1',
    }).toString();

    const { data } = await axiosInstance.get(
      `/cryptocurrencies/news?${queryParams}`,
    );
    return data;
  } catch (error: unknown) {
    const status = (error as ErrorResponse)?.status || 500;
    return { data: null, status };
  }
};

export const useNewsQuery = (category: string) => {
  return useQuery<NewsResponse, ErrorResponse>(['getNews', category], () =>
    getNews(category),
  );
};
