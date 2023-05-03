import {
  FavoriteCryptocurrencyRepository,
  FavoriteCryptocurrencyService,
  GetFavoriteCryptocurrenciesRequestDto,
  GetFavoriteCryptocurrenciesResponseDto,
  UpsertFavoriteCryptocurrencyRequestDto,
  UpsertFavoriteCryptocurrencyResponseDto,
} from '@/modules';
import { Test, TestingModule } from '@nestjs/testing';
import { createMock as autoMocker } from '@golevelup/ts-jest';
import { mockFavoriteCryptocurrencies } from '../mocks';

describe('FavoriteCryptocurrencyService', () => {
  let moduleRef: TestingModule;
  let favoriteCryptocurrencyService: FavoriteCryptocurrencyService;
  let favoriteCryptocurrencyRepository: jest.Mocked<FavoriteCryptocurrencyRepository>;

  const mockUserId = '642dbb69f30c40a0e30c5531';

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [FavoriteCryptocurrencyService],
    })
      .useMocker(autoMocker)
      .compile();

    favoriteCryptocurrencyService =
      moduleRef.get<FavoriteCryptocurrencyService>(
        FavoriteCryptocurrencyService,
      );
    favoriteCryptocurrencyRepository = moduleRef.get(
      FavoriteCryptocurrencyRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('upsertFavoriteCryptocurrencies', () => {
    const mockUpsertRequest: UpsertFavoriteCryptocurrencyRequestDto = {
      userId: mockUserId,
      ...mockFavoriteCryptocurrencies[0],
      isFavorite: false,
    };

    it('should upsert favorite cryptocurrency and return a response', async () => {
      favoriteCryptocurrencyRepository.upsertOne.mockResolvedValue({
        userId: mockUserId,
        ...mockFavoriteCryptocurrencies[0],
      });

      const result: UpsertFavoriteCryptocurrencyResponseDto =
        await favoriteCryptocurrencyService.upsertFavoriteCryptocurrency(
          mockUpsertRequest,
        );

      expect(favoriteCryptocurrencyRepository.upsertOne).toHaveBeenCalledWith(
        mockUpsertRequest,
      );
      expect(result).toEqual({
        status: 200,
        data: mockFavoriteCryptocurrencies[0],
        error: [],
      });
    });

    it('should return 422 if upserting favorite cryptocurrency fails', async () => {
      favoriteCryptocurrencyRepository.upsertOne.mockResolvedValue(null);

      const result: UpsertFavoriteCryptocurrencyResponseDto =
        await favoriteCryptocurrencyService.upsertFavoriteCryptocurrency(
          mockUpsertRequest,
        );

      expect(favoriteCryptocurrencyRepository.upsertOne).toHaveBeenCalledWith(
        mockUpsertRequest,
      );
      expect(result).toEqual({
        status: 422,
        data: undefined,
        error: ['unable to upsert favorite cryptocurrency'],
      });
    });
  });

  describe('getFavoriteCryptocurrencies', () => {
    const mockGetRequest: GetFavoriteCryptocurrenciesRequestDto = {
      userId: mockUserId,
    };

    it('should return favorite cryptocurrencies for a user', async () => {
      favoriteCryptocurrencyRepository.findAllByUserId.mockResolvedValue([
        {
          userId: mockUserId,
          ...mockFavoriteCryptocurrencies[0],
        },
        {
          userId: mockUserId,
          ...mockFavoriteCryptocurrencies[1],
        },
        {
          userId: mockUserId,
          ...mockFavoriteCryptocurrencies[2],
        },
      ]);

      const result: GetFavoriteCryptocurrenciesResponseDto =
        await favoriteCryptocurrencyService.getFavoriteCryptocurrencies(
          mockGetRequest,
        );

      expect(
        favoriteCryptocurrencyRepository.findAllByUserId,
      ).toHaveBeenCalledWith(mockUserId);
      expect(result).toEqual({
        status: 200,
        data: mockFavoriteCryptocurrencies,
        error: [],
      });
    });

    it('should return empty array if no favorite cryptocurrencies are found for a user', async () => {
      favoriteCryptocurrencyRepository.findAllByUserId.mockResolvedValue([]);

      const result: GetFavoriteCryptocurrenciesResponseDto =
        await favoriteCryptocurrencyService.getFavoriteCryptocurrencies(
          mockGetRequest,
        );

      expect(
        favoriteCryptocurrencyRepository.findAllByUserId,
      ).toHaveBeenCalledWith(mockUserId);
      expect(result).toEqual({
        status: 200,
        data: [],
        error: [],
      });
    });
  });
});
