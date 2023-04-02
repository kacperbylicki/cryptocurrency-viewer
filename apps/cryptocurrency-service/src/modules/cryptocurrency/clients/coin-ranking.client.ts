import axios from 'axios';
import { ConfigContainer } from '@unifig/core';
import {
  Cryptocurrency,
  CryptocurrencyHistory,
} from '@cryptocurrency-viewer/transport';
import { ExternalApiConfig } from '@/config';
import {
  GetCryptocurrenciesRequest,
  GetCryptocurrencyHistoryRequest,
  GetCryptocurrencyRequest,
} from '../dtos';
import { InjectConfig } from '@unifig/nest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoinRankingClient {
  constructor(
    @InjectConfig(ExternalApiConfig)
    private config: ConfigContainer<ExternalApiConfig>,
  ) {}

  async getCryptocurrencies(
    payload: GetCryptocurrenciesRequest,
  ): Promise<Cryptocurrency[]> {
    const { coinRankingApiHost, rapidApiKey } = this.config.values;

    const options = {
      method: 'GET',
      url: `https://${coinRankingApiHost}/coins`,
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: payload.timePeriod,
        tiers: payload.tiers,
        orderBy: payload.orderBy,
        orderDirection: payload.orderDirection,
        limit: payload.limit,
        offset: payload.offset,
      },
      headers: {
        'X-RapidAPI-Host': coinRankingApiHost,
        'X-RapidAPI-Key': rapidApiKey,
      },
    };

    const {
      data: {
        data: { coins },
      },
    } = await axios.request(options);

    return coins;
  }

  async getCryptocurrenciesHistory(
    payload: GetCryptocurrencyHistoryRequest,
  ): Promise<CryptocurrencyHistory> {
    const { coinRankingApiHost, rapidApiKey } = this.config.values;

    const options = {
      method: 'GET',
      url: `https://${coinRankingApiHost}/coin/${payload.cryptocurrencyId}/history`,
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: payload.timePeriod,
      },
      headers: {
        'X-RapidAPI-Host': coinRankingApiHost,
        'X-RapidAPI-Key': rapidApiKey,
      },
    };

    const {
      data: { data },
    } = await axios.request(options);

    return data;
  }

  async getCryptocurrency(
    payload: GetCryptocurrencyRequest,
  ): Promise<Cryptocurrency> {
    const { coinRankingApiHost, rapidApiKey } = this.config.values;

    const options = {
      method: 'GET',
      url: `https://${coinRankingApiHost}/coin/${payload.cryptocurrencyId}`,
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: payload.timePeriod,
      },
      headers: {
        'X-RapidAPI-Host': coinRankingApiHost,
        'X-RapidAPI-Key': rapidApiKey,
      },
    };

    const {
      data: {
        data: { coin },
      },
    } = await axios.request(options);

    return coin;
  }
}
