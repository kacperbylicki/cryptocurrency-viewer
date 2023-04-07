import {
  CryptocurrencyNews,
  CryptocurrencyNews_Category,
} from '@cryptocurrency-viewer/transport';

export const mockCryptocurrencyNews: CryptocurrencyNews[] = [
  {
    name: 'Article 1',
    url: 'https://example.com/article1',
    image: {
      contentUrl: 'test-image',
      width: 100,
      height: 100,
    },
    description: 'test-description',
    datePublished: '2021-07-01T00:00:00.000Z',
    category: CryptocurrencyNews_Category.Entertainment,
  },
  {
    name: 'Article 2',
    url: 'https://example.com/article2',
    image: {
      contentUrl: 'test-image',
      width: 100,
      height: 100,
    },
    description: 'test-description',
    datePublished: '2021-07-01T00:00:00.000Z',
    category: CryptocurrencyNews_Category.Business,
  },
];
