import { FavoriteCryptocurrencyRepository } from '../repositories';
import {
  GetFavoriteCryptocurrenciesRequest,
  GetFavoriteCryptocurrenciesResponse,
  UpsertFavoriteCryptocurrencyRequest,
  UpsertFavoriteCryptocurrencyResponse,
} from '../dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoriteCryptocurrencyService {
  constructor(
    private readonly favoriteCryptocurrencyRepository: FavoriteCryptocurrencyRepository,
  ) {}

  async upsertFavoriteCryptocurrencies(
    payload: UpsertFavoriteCryptocurrencyRequest,
  ): Promise<UpsertFavoriteCryptocurrencyResponse> {
    const favoriteCryptocurrency =
      await this.favoriteCryptocurrencyRepository.upsertOne(payload);

    return {
      status: 200,
      data: favoriteCryptocurrency,
      error: [],
    };
  }

  async getFavoriteCryptocurrencies(
    payload: GetFavoriteCryptocurrenciesRequest,
  ): Promise<GetFavoriteCryptocurrenciesResponse> {
    const favoriteCryptocurrencies =
      await this.favoriteCryptocurrencyRepository.findAllByUserId(
        payload.userId,
      );

    return {
      status: 200,
      data: favoriteCryptocurrencies,
      error: [],
    };
  }
}
