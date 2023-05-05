export type CryptocurrenciesResponse = {
  status: number;
  data: Cryptocurrency[] | null;
};

export type Cryptocurrency = {
  uuid: string;
  change: string;
  iconUrl: string;
  name: string;
  price: string;
  rank: number;
  symbol: string;
  marketCap: string;
  sparkline: string[];
};
