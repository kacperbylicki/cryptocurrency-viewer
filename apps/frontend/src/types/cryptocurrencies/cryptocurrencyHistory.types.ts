export type CryptocurrencyHistoryResponse = {
  status: number;
  data: CryptocurrencyHistory | null;
};

export type CryptocurrencyHistory = {
  change: string;
  history: HistoryContent[];
};

export type HistoryContent = {
  price: string;
  timestamp: TimestampContent;
};

export type TimestampContent = {
  low: number;
  high: number;
  unsigned: boolean;
};
