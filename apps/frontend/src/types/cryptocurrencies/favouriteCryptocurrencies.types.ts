import { Cryptocurrency } from './cryptocurrencies.types';

export type FavouriteCryptocurrency = {
  cryptocurrency: Cryptocurrency;
  isFavorite: boolean;
};

export type ToggleFavouriteCryptocurrencyResponse = {
  status: number;
};

export type GetFavouriteCryptocurrencyResponse = {
  status: number;
  data?: Cryptocurrency[] | null;
};
