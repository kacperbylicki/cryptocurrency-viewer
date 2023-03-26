import {
  Cryptocurrency,
  FavoriteCryptocurrency,
  UpsertFavoriteCryptocurrencyRequest as IUpsertFavoriteCryptocurrencyRequest,
  UpsertFavoriteCryptocurrencyResponse as IUpsertFavoriteCryptocurrencyResponse,
} from '@cryptocurrency-viewer/transport';

export class UpsertFavoriteCryptocurrencyRequest
  implements IUpsertFavoriteCryptocurrencyRequest
{
  userId!: string;
  cryptocurrency!: Cryptocurrency;
  isFavorite!: boolean;
}

export class UpsertFavoriteCryptocurrencyResponse
  implements IUpsertFavoriteCryptocurrencyResponse
{
  status!: number;
  error!: string[];
  data?: FavoriteCryptocurrency;
}
