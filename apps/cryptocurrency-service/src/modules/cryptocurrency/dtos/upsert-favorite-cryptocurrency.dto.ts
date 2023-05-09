import {
  Cryptocurrency,
  FavoriteCryptocurrency,
  UpsertFavoriteCryptocurrencyRequest,
  UpsertFavoriteCryptocurrencyResponse,
} from '@cryptocurrency-viewer/transport';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class UpsertFavoriteCryptocurrencyRequestDto
  implements UpsertFavoriteCryptocurrencyRequest
{
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  cryptocurrency!: Cryptocurrency;

  @IsBoolean()
  isFavorite!: boolean;
}

export class UpsertFavoriteCryptocurrencyResponseDto
  implements UpsertFavoriteCryptocurrencyResponse
{
  status!: number;
  error!: string[];
  data?: FavoriteCryptocurrency;
}
