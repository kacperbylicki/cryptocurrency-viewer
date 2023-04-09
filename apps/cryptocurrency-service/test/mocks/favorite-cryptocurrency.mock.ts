import { FavoriteCryptocurrency } from '@cryptocurrency-viewer/transport';
import { mockCryptocurrencies } from './cryptocurrency.mock';

export const mockFavoriteCryptocurrencies: FavoriteCryptocurrency[] = [
  {
    cryptocurrency: mockCryptocurrencies[0],
    isFavorite: true,
  },
  {
    cryptocurrency: mockCryptocurrencies[1],
    isFavorite: false,
  },
  {
    cryptocurrency: mockCryptocurrencies[2],
    isFavorite: true,
  },
];
