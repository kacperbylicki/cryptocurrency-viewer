import { CRYPTOCURRENCY_SERVICE_NAME } from '@cryptocurrency-viewer/transport';
import { Controller } from '@nestjs/common';
import { FavoriteCryptocurrencyService } from '../services';
import {
  GetFavoriteCryptocurrenciesRequestDto,
  GetFavoriteCryptocurrenciesResponseDto,
  UpsertFavoriteCryptocurrencyRequestDto,
  UpsertFavoriteCryptocurrencyResponseDto,
} from '../dtos';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class FavoriteCryptocurrencyController {
  constructor(
    private readonly favoriteCryptocurrencyService: FavoriteCryptocurrencyService,
  ) {}

  @GrpcMethod(CRYPTOCURRENCY_SERVICE_NAME, 'UpsertFavoriteCryptocurrency')
  async upsertFavoriteCryptocurrency(
    payload: UpsertFavoriteCryptocurrencyRequestDto,
  ): Promise<UpsertFavoriteCryptocurrencyResponseDto> {
    return this.favoriteCryptocurrencyService.upsertFavoriteCryptocurrency(
      payload,
    );
  }

  @GrpcMethod(CRYPTOCURRENCY_SERVICE_NAME, 'GetFavoriteCryptocurrencies')
  async getFavoriteCryptocurrencies(
    payload: GetFavoriteCryptocurrenciesRequestDto,
  ): Promise<GetFavoriteCryptocurrenciesResponseDto> {
    return this.favoriteCryptocurrencyService.getFavoriteCryptocurrencies(
      payload,
    );
  }
}
