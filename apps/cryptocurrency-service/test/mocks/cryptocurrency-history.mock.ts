import { CryptocurrencyHistory } from '@cryptocurrency-viewer/transport';

export const mockCryptocurrencyHistory: CryptocurrencyHistory = {
  change: '5.35%',
  history: [
    {
      timestamp: 1625256000000,
      price: '10000',
    },
    {
      timestamp: 1625342400000,
      price: '12000',
    },
  ],
};
