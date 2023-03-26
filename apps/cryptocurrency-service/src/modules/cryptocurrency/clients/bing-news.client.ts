import axios from 'axios';
import { CryptocurrencyNews } from '@cryptocurrency-viewer/transport';
import { GetCryptocurrencyNewsRequest } from '../dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BingNewsClient {
  private readonly API_URL = 'https://bing-news-search1.p.rapidapi.com';

  async getCryptocurrencyNews(
    payload: GetCryptocurrencyNewsRequest,
  ): Promise<CryptocurrencyNews[]> {
    const { data } = await axios.get<CryptocurrencyNews[]>(
      `${this.API_URL}/news/search
        ?q=${payload.category}
        &safeSearch=Off
        &textFormat=Raw
        &freshness=Day
        &count=${payload.limit}
      `,
    );

    return data;
  }
}
