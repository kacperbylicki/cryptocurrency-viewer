/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const cryptocurrencyProtobufPackage = 'cryptocurrency';

export interface Cryptocurrency {
  uuid: string;
  change: string;
  iconUrl: string;
  name: string;
  price: string;
  rank: number;
  symbol: string;
  dailyVolume: string;
  marketCap: string;
  sparkline: string[];
}

export interface FavoriteCryptocurrency {
  cryptocurrency: Cryptocurrency;
  isFavorite: boolean;
}

export interface CryptocurrencyNews {
  name: string;
  url: string;
  image: CryptocurrencyNews_Image;
  description: string;
  datePublished: string;
  category: CryptocurrencyNews_Category;
}

export enum CryptocurrencyNews_Category {
  Business = 0,
  Entertainment = 1,
  UNRECOGNIZED = -1,
}

export interface CryptocurrencyNews_Image {
  contentUrl: string;
  width: number;
  height: number;
}

export interface CryptocurrencyHistory {
  change: string;
  history: CryptocurrencyHistory_History[];
}

export interface CryptocurrencyHistory_History {
  price: string;
  timestamp: number;
}

/** GetFavoriteCryptocurrencies */
export interface GetFavoriteCryptocurrenciesRequest {
  userId: string;
}

export interface GetFavoriteCryptocurrenciesResponse {
  status: number;
  error: string[];
  data: FavoriteCryptocurrency[];
}

/** UpsertFavoriteCryptocurrency */
export interface UpsertFavoriteCryptocurrencyRequest {
  userId: string;
  cryptocurrency: Cryptocurrency;
  isFavorite: boolean;
}

export interface UpsertFavoriteCryptocurrencyResponse {
  status: number;
  error: string[];
  data?: FavoriteCryptocurrency;
}

/** GetCryptocurrencyNews */
export interface GetCryptocurrencyNewsRequest {
  category: string;
  limit: number;
  offset?: number;
}

export interface GetCryptocurrencyNewsResponse {
  status: number;
  error: string[];
  data: CryptocurrencyNews[];
}

/** GetCryptocurrencyHistory */
export interface GetCryptocurrencyHistoryRequest {
  cryptocurrencyId: string;
  timePeriod: string;
}

export interface GetCryptocurrencyHistoryResponse {
  status: number;
  error: string[];
  data?: CryptocurrencyHistory;
}

/** GetCryptocurrencies */
export interface GetCryptocurrenciesRequest {
  timePeriod: string;
  tiers: number;
  orderBy: string;
  orderDirection: string;
  limit: number;
  offset: number;
}

export interface GetCryptocurrenciesResponse {
  status: number;
  error: string[];
  data: Cryptocurrency[];
}

/** GetCryptocurrency */
export interface GetCryptocurrencyRequest {
  cryptocurrencyId: string;
  timePeriod: string;
}

export interface GetCryptocurrencyResponse {
  status: number;
  error: string[];
  data?: Cryptocurrency;
}

export const CRYPTOCURRENCY_PACKAGE_NAME = 'cryptocurrency';

export abstract class CryptocurrencyServiceClient {
  abstract getFavoriteCryptocurrencies(
    request: GetFavoriteCryptocurrenciesRequest,
  ): Observable<GetFavoriteCryptocurrenciesResponse>;

  abstract upsertFavoriteCryptocurrency(
    request: UpsertFavoriteCryptocurrencyRequest,
  ): Observable<UpsertFavoriteCryptocurrencyResponse>;

  abstract getCryptocurrencyNews(
    request: GetCryptocurrencyNewsRequest,
  ): Observable<GetCryptocurrencyNewsResponse>;

  abstract getCryptocurrencyHistory(
    request: GetCryptocurrencyHistoryRequest,
  ): Observable<GetCryptocurrencyHistoryResponse>;

  abstract getCryptocurrencies(
    request: GetCryptocurrenciesRequest,
  ): Observable<GetCryptocurrenciesResponse>;

  abstract getCryptocurrency(
    request: GetCryptocurrencyRequest,
  ): Observable<GetCryptocurrencyResponse>;
}

export interface CryptocurrencyServiceController {
  getFavoriteCryptocurrencies(
    request: GetFavoriteCryptocurrenciesRequest,
  ):
    | Promise<GetFavoriteCryptocurrenciesResponse>
    | Observable<GetFavoriteCryptocurrenciesResponse>
    | GetFavoriteCryptocurrenciesResponse;

  upsertFavoriteCryptocurrency(
    request: UpsertFavoriteCryptocurrencyRequest,
  ):
    | Promise<UpsertFavoriteCryptocurrencyResponse>
    | Observable<UpsertFavoriteCryptocurrencyResponse>
    | UpsertFavoriteCryptocurrencyResponse;

  getCryptocurrencyNews(
    request: GetCryptocurrencyNewsRequest,
  ):
    | Promise<GetCryptocurrencyNewsResponse>
    | Observable<GetCryptocurrencyNewsResponse>
    | GetCryptocurrencyNewsResponse;

  getCryptocurrencyHistory(
    request: GetCryptocurrencyHistoryRequest,
  ):
    | Promise<GetCryptocurrencyHistoryResponse>
    | Observable<GetCryptocurrencyHistoryResponse>
    | GetCryptocurrencyHistoryResponse;

  getCryptocurrencies(
    request: GetCryptocurrenciesRequest,
  ):
    | Promise<GetCryptocurrenciesResponse>
    | Observable<GetCryptocurrenciesResponse>
    | GetCryptocurrenciesResponse;

  getCryptocurrency(
    request: GetCryptocurrencyRequest,
  ):
    | Promise<GetCryptocurrencyResponse>
    | Observable<GetCryptocurrencyResponse>
    | GetCryptocurrencyResponse;
}

export function CryptocurrencyServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'getFavoriteCryptocurrencies',
      'upsertFavoriteCryptocurrency',
      'getCryptocurrencyNews',
      'getCryptocurrencyHistory',
      'getCryptocurrencies',
      'getCryptocurrency',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('CryptocurrencyService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('CryptocurrencyService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const CRYPTOCURRENCY_SERVICE_NAME = 'CryptocurrencyService';
