import {
  BingNewsClient,
  CoinRankingClient,
  CryptocurrencyService,
  GetCryptocurrenciesRequest,
  GetCryptocurrencyHistoryRequest,
  GetCryptocurrencyNewsRequest,
  GetCryptocurrencyRequest,
} from '@/modules';
import { Test, TestingModule } from '@nestjs/testing';
import { createMock as autoMocker } from '@golevelup/ts-jest';
import {
  mockCryptocurrencies,
  mockCryptocurrencyHistory,
  mockCryptocurrencyNews,
} from '../mocks';

describe('CryptocurrencyService', () => {
  let moduleRef: TestingModule;
  let cryptocurrencyService: CryptocurrencyService;
  let coinRankingClient: CoinRankingClient;
  let bingNewsClient: BingNewsClient;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        CryptocurrencyService,
        // {
        //   provide: CoinRankingClient,
        //   useFactory: () => ({
        //     getCryptocurrencies: jest.fn(),
        //     getCryptocurrenciesHistory: jest.fn(),
        //     getCryptocurrency: jest.fn(),
        //   }),
        // },
        // {
        //   provide: BingNewsClient,
        //   useFactory: () => ({
        //     getCryptocurrencyNews: jest.fn(),
        //   }),
        // },
      ],
    })
      .useMocker(autoMocker)
      .compile();

    cryptocurrencyService = moduleRef.get<CryptocurrencyService>(
      CryptocurrencyService,
    );
    coinRankingClient = moduleRef.get<CoinRankingClient>(CoinRankingClient);
    bingNewsClient = moduleRef.get<BingNewsClient>(BingNewsClient);
  });

  describe('getCryptocurrencies', () => {
    it('should return successfully when getCryptocurrencies is successful', async () => {
      const payload: GetCryptocurrenciesRequest = {
        timePeriod: '24h',
        tiers: 1,
        orderBy: 'market_cap',
        orderDirection: 'desc',
        limit: 10,
        offset: 0,
      };

      jest
        .spyOn(coinRankingClient, 'getCryptocurrencies')
        .mockResolvedValue(mockCryptocurrencies);

      const result = await cryptocurrencyService.getCryptocurrencies(payload);
      expect(result.status).toEqual(200);
      expect(result.data).toEqual(mockCryptocurrencies);
      expect(result.error).toEqual([]);
    });

    // Add more test cases for error handling, like 500 status code and other response status codes
  });

  describe('getCryptocurrencyHistory', () => {
    it('should return successfully when getCryptocurrenciesHistory is successful', async () => {
      const payload: GetCryptocurrencyHistoryRequest = {
        cryptocurrencyId: '1',
        timePeriod: '24h',
      };

      jest
        .spyOn(coinRankingClient, 'getCryptocurrenciesHistory')
        .mockResolvedValue(mockCryptocurrencyHistory);

      const result = await cryptocurrencyService.getCryptocurrencyHistory(
        payload,
      );
      expect(result.status).toEqual(200);
      expect(result.data).toEqual(mockCryptocurrencyHistory);
      expect(result.error).toEqual([]);
    });
  });

  describe('getCryptocurrency', () => {
    it('should return successfully when getCryptocurrency is successful', async () => {
      const payload: GetCryptocurrencyRequest = {
        cryptocurrencyId: '1',
        timePeriod: '24h',
      };

      jest
        .spyOn(coinRankingClient, 'getCryptocurrency')
        .mockResolvedValue(mockCryptocurrencies[0]);

      const result = await cryptocurrencyService.getCryptocurrency(payload);
      expect(result.status).toEqual(200);
      expect(result.data).toEqual(mockCryptocurrencies[0]);
      expect(result.error).toEqual([]);
    });
  });

  describe('getCryptocurrencyNews', () => {
    it('should return successfully when getCryptocurrencyNews is successful', async () => {
      const payload: GetCryptocurrencyNewsRequest = {
        category: 'bitcoin',
        limit: 10,
      };

      jest
        .spyOn(bingNewsClient, 'getCryptocurrencyNews')
        .mockResolvedValue(mockCryptocurrencyNews);

      const result = await cryptocurrencyService.getCryptocurrencyNews(payload);
      expect(result.status).toEqual(200);
      expect(result.data).toEqual(mockCryptocurrencyNews);
      expect(result.error).toEqual([]);
    });
  });
});
