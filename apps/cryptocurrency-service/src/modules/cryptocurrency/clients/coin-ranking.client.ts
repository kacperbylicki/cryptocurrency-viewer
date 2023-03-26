import axios from 'axios';
import {
  Cryptocurrency,
  CryptocurrencyHistory,
} from '@cryptocurrency-viewer/transport';
import {
  GetCryptocurrenciesRequest,
  GetCryptocurrencyHistoryRequest,
  GetCryptocurrencyRequest,
  GetCryptocurrencyTimelineRequest,
} from '../dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoinRankingClient {
  private readonly API_URL = 'https://coinranking1.p.rapidapi.com';

  async getCryptocurrencyTimeline(
    payload: GetCryptocurrencyTimelineRequest,
  ): Promise<Cryptocurrency> {
    const { data } = await axios.get<Cryptocurrency>(
      `${this.API_URL}/coin/${payload.cryptocurrencyId}
        ?referenceCurrencyUuid=yhjMzLPhuIDl
        &timePeriod=${payload.timePeriod}
      `,
    );

    return data;
  }

  async getCryptocurrencies(
    payload: GetCryptocurrenciesRequest,
  ): Promise<Cryptocurrency[]> {
    const { data } = await axios.get<Cryptocurrency[]>(
      `${this.API_URL}/coins
        ?referenceCurrencyUuid=yhjMzLPhuIDl
        &timePeriod=${payload.timePeriod}
        &tiers=${payload.tiers}
        &orderBy=${payload.orderBy}
        &orderDirection=${payload.orderDirection}
        &limit=${payload.limit}
        &offset=${payload.offset}
      `,
    );

    return data;
  }

  async getCryptocurrenciesHistory(
    payload: GetCryptocurrencyHistoryRequest,
  ): Promise<CryptocurrencyHistory> {
    const { data } = await axios.get<CryptocurrencyHistory>(
      `${this.API_URL}/coin/${payload.cryptocurrencyId}/history
        ?referenceCurrencyUuid=yhjMzLPhuIDl
        &timePeriod=${payload.timePeriod}
      `,
    );

    return data;
  }

  async getCryptocurrency(
    payload: GetCryptocurrencyRequest,
  ): Promise<Cryptocurrency> {
    const { data } = await axios.get<Cryptocurrency>(
      `${this.API_URL}/coin/${payload.cryptocurrencyId}
        ?referenceCurrencyUuid=yhjMzLPhuIDl
        &timePeriod=${payload.timePeriod}
      `,
    );

    return data;
  }
}
