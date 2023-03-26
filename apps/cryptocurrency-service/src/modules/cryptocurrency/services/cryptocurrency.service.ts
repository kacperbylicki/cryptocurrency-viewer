import { BingNewsClient, CoinRankingClient } from '../clients';
import {
  GetCryptocurrenciesRequest,
  GetCryptocurrenciesResponse,
  GetCryptocurrencyHistoryRequest,
  GetCryptocurrencyHistoryResponse,
  GetCryptocurrencyNewsRequest,
  GetCryptocurrencyNewsResponse,
  GetCryptocurrencyRequest,
  GetCryptocurrencyResponse,
  GetCryptocurrencyTimelineRequest,
  GetCryptocurrencyTimelineResponse,
} from '../dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptocurrencyService {
  constructor(
    private readonly coinRankingClient: CoinRankingClient,
    private readonly bingNewsClient: BingNewsClient,
  ) {}

  async getCryptocurrencies(
    payload: GetCryptocurrenciesRequest,
  ): Promise<GetCryptocurrenciesResponse> {
    try {
      const cryptocurrencies = await this.coinRankingClient.getCryptocurrencies(
        payload,
      );

      return {
        status: 200,
        data: cryptocurrencies,
        error: [],
      };
    } catch (error: any) {
      if (!error?.response) {
        return {
          status: 500,
          data: [],
          error: [error?.message],
        };
      }

      return {
        status: error?.response?.status,
        data: [],
        error: [error?.response?.statusText],
      };
    }
  }

  async getCryptocurrencyTimeline(
    payload: GetCryptocurrencyTimelineRequest,
  ): Promise<GetCryptocurrencyTimelineResponse> {
    try {
      const cryptocurrencyTimeline =
        await this.coinRankingClient.getCryptocurrencyTimeline(payload);

      return {
        status: 200,
        data: cryptocurrencyTimeline,
        error: [],
      };
    } catch (error: any) {
      if (!error?.response) {
        return {
          status: 500,
          data: undefined,
          error: [error?.message],
        };
      }

      return {
        status: error?.response?.status,
        data: undefined,
        error: [error?.response?.statusText],
      };
    }
  }

  async getCryptocurrenciesHistory(
    payload: GetCryptocurrencyHistoryRequest,
  ): Promise<GetCryptocurrencyHistoryResponse> {
    try {
      const cryptocurrenciesHistory =
        await this.coinRankingClient.getCryptocurrenciesHistory(payload);

      return {
        status: 200,
        data: cryptocurrenciesHistory,
        error: [],
      };
    } catch (error: any) {
      if (!error?.response) {
        return {
          status: 500,
          data: undefined,
          error: [error?.message],
        };
      }

      return {
        status: error?.response?.status,
        data: undefined,
        error: [error?.response?.statusText],
      };
    }
  }

  async getCryptocurrency(
    payload: GetCryptocurrencyRequest,
  ): Promise<GetCryptocurrencyResponse> {
    try {
      const cryptocurrency = await this.coinRankingClient.getCryptocurrency(
        payload,
      );

      return {
        status: 200,
        data: cryptocurrency,
        error: [],
      };
    } catch (error: any) {
      if (!error?.response) {
        return {
          status: 500,
          data: undefined,
          error: [error?.message],
        };
      }

      return {
        status: error?.response?.status,
        data: undefined,
        error: [error?.response?.statusText],
      };
    }
  }

  async getCryptocurrencyNews(
    payload: GetCryptocurrencyNewsRequest,
  ): Promise<GetCryptocurrencyNewsResponse> {
    try {
      const cryptocurrencyNews =
        await this.bingNewsClient.getCryptocurrencyNews(payload);

      return {
        status: 200,
        data: cryptocurrencyNews,
        error: [],
      };
    } catch (error: any) {
      if (!error?.response) {
        return {
          status: 500,
          data: [],
          error: [error?.message],
        };
      }

      return {
        status: error?.response?.status,
        data: [],
        error: [error?.response?.statusText],
      };
    }
  }
}
