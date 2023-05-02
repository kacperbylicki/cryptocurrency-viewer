import { FavoriteCryptocurrencyRepository } from '../repositories';
import {
  GetFavoriteCryptocurrenciesRequestDto,
  GetFavoriteCryptocurrenciesResponseDto,
  UpsertFavoriteCryptocurrencyRequestDto,
  UpsertFavoriteCryptocurrencyResponseDto,
} from '../dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoriteCryptocurrencyService {
  constructor(
    private readonly favoriteCryptocurrencyRepository: FavoriteCryptocurrencyRepository,
  ) {}

  async upsertFavoriteCryptocurrency(
    payload: UpsertFavoriteCryptocurrencyRequestDto,
  ): Promise<UpsertFavoriteCryptocurrencyResponseDto> {
    const favoriteCryptocurrency =
      await this.favoriteCryptocurrencyRepository.upsertOne(payload);

    if (!favoriteCryptocurrency) {
      return {
        status: 422,
        data: undefined,
        error: [`unable to upsert favorite cryptocurrency`],
      };
    }

    return {
      status: 200,
      data: {
        cryptocurrency: favoriteCryptocurrency?.cryptocurrency,
        isFavorite: favoriteCryptocurrency?.isFavorite,
      },
      error: [],
    };
  }

  async getFavoriteCryptocurrencies(
    payload: GetFavoriteCryptocurrenciesRequestDto,
  ): Promise<GetFavoriteCryptocurrenciesResponseDto> {
    const favoriteCryptocurrencies =
      await this.favoriteCryptocurrencyRepository.findAllByUserId(
        payload.userId,
      );

    return {
      status: 200,
      data: favoriteCryptocurrencies.map((favoriteCryptocurrency) => ({
        cryptocurrency: favoriteCryptocurrency.cryptocurrency,
        isFavorite: favoriteCryptocurrency.isFavorite,
      })),
      error: [],
    };
  }
}
