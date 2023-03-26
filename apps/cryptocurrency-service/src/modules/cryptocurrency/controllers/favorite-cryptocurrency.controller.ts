import { CRYPTOCURRENCY_SERVICE_NAME } from '@cryptocurrency-viewer/transport';
import { Controller } from '@nestjs/common';
import { FavoriteCryptocurrencyService } from '../services';
import {
  GetFavoriteCryptocurrenciesRequest,
  GetFavoriteCryptocurrenciesResponse,
  UpsertFavoriteCryptocurrencyRequest,
  UpsertFavoriteCryptocurrencyResponse,
} from '../dtos';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class FavoriteCryptocurrencyController {
  constructor(
    private readonly favoriteCryptocurrencyService: FavoriteCryptocurrencyService,
  ) {}

  @GrpcMethod(CRYPTOCURRENCY_SERVICE_NAME, 'UpsertFavoriteCryptocurrency')
  async upsertFavoriteCryptocurrency(
    payload: UpsertFavoriteCryptocurrencyRequest,
  ): Promise<UpsertFavoriteCryptocurrencyResponse> {
    return this.favoriteCryptocurrencyService.upsertFavoriteCryptocurrencies(
      payload,
    );
  }

  @GrpcMethod(CRYPTOCURRENCY_SERVICE_NAME, 'GetFavoriteCryptocurrencies')
  async getFavoriteCryptocurrencies(
    payload: GetFavoriteCryptocurrenciesRequest,
  ): Promise<GetFavoriteCryptocurrenciesResponse> {
    return this.favoriteCryptocurrencyService.getFavoriteCryptocurrencies(
      payload,
    );
  }
}
