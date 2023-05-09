export type NewsResponse = {
  status: number;
  data?: CryptocurrencyNews[] | null;
};

export type CryptocurrencyNews = {
  name?: string;
  url?: string;
  image?: any;
  description?: string;
  datePublished?: string;
};
