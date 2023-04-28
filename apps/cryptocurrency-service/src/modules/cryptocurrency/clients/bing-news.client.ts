import axios from 'axios';
import { ConfigContainer } from '@unifig/core';
import { CryptocurrencyNews } from '@cryptocurrency-viewer/transport';
import { ExternalApiConfig } from '@/config';
import { GetCryptocurrencyNewsRequest } from '../dtos';
import { InjectConfig } from '@unifig/nest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BingNewsClient {
  constructor(
    @InjectConfig(ExternalApiConfig)
    private config: ConfigContainer<ExternalApiConfig>,
  ) {}

  async getCryptocurrencyNews(
    payload: GetCryptocurrencyNewsRequest,
  ): Promise<CryptocurrencyNews[]> {
    const { bingNewsApiHost, rapidApiKey } = this.config.values;

    const options = {
      method: 'GET',
      url: `https://${bingNewsApiHost}/news/search`,
      params: {
        q: payload.category,
        safeSearch: 'Off',
        textFormat: 'Raw',
        freshness: 'Day',
        count: payload.limit,
        offset: payload.offset,
      },
      headers: {
        'X-RapidAPI-Host': bingNewsApiHost,
        'X-RapidAPI-Key': rapidApiKey,
      },
    };

    const {
      data: { value: cryptocurrencyNews },
    } = await axios.request<{ value: CryptocurrencyNews[] }>(options);

    return cryptocurrencyNews;
  }
}
