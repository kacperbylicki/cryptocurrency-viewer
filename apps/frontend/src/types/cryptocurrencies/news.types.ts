export type NewsResponse = {
  status: number;
  data?: CryptocurrencyNews[] | null;
};

export type CryptocurrencyNews = {
  name?: string;
  url?: string;
  image?: CryptocurrencyNewsImage;
  description?: string;
  datePublished?: string;
};

export type CryptocurrencyNewsImage = {
  thumbnail?: {
    contentUrl?: string;
    width?: number;
    height?: number;
  };
};
