import { CRYPTOCURRENCY_SERVICE_NAME } from '@cryptocurrency-viewer/transport';
import { Controller } from '@nestjs/common';
import { CryptocurrencyService } from '../services';
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
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class CryptocurrencyController {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService) {}

  @GrpcMethod(CRYPTOCURRENCY_SERVICE_NAME, 'GetCryptocurrencies')
  async getCryptocurrencies(
    payload: GetCryptocurrenciesRequest,
  ): Promise<GetCryptocurrenciesResponse> {
    return this.cryptocurrencyService.getCryptocurrencies(payload);
  }

  @GrpcMethod(CRYPTOCURRENCY_SERVICE_NAME, 'GetCryptocurrencyTimeline')
  async getCryptocurrencyTimeline(
    payload: GetCryptocurrencyTimelineRequest,
  ): Promise<GetCryptocurrencyTimelineResponse> {
    return this.cryptocurrencyService.getCryptocurrencyTimeline(payload);
  }

  @GrpcMethod(CRYPTOCURRENCY_SERVICE_NAME, 'GetCryptocurrency')
  async getCryptocurrency(
    payload: GetCryptocurrencyRequest,
  ): Promise<GetCryptocurrencyResponse> {
    return this.cryptocurrencyService.getCryptocurrency(payload);
  }

  @GrpcMethod(CRYPTOCURRENCY_SERVICE_NAME, 'GetCryptocurrencyNews')
  async getCryptocurrencyNews(
    payload: GetCryptocurrencyNewsRequest,
  ): Promise<GetCryptocurrencyNewsResponse> {
    return this.cryptocurrencyService.getCryptocurrencyNews(payload);
  }

  @GrpcMethod(CRYPTOCURRENCY_SERVICE_NAME, 'GetCryptocurrenciesHistory')
  async getCryptocurrenciesHistory(
    payload: GetCryptocurrencyHistoryRequest,
  ): Promise<GetCryptocurrencyHistoryResponse> {
    return this.cryptocurrencyService.getCryptocurrenciesHistory(payload);
  }
}
