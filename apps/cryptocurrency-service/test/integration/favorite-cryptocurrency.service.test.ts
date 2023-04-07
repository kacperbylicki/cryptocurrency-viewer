import {
  FavoriteCryptocurrency,
  FavoriteCryptocurrencyRepository,
  FavoriteCryptocurrencySchema,
  FavoriteCryptocurrencyService,
} from '@/modules';
import { Model } from 'mongoose';
import {
  MongooseModule,
  getConnectionToken,
  getModelToken,
} from '@nestjs/mongoose';
import { MongooseTestModule } from '@cryptocurrency-viewer/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { createMock as autoMocker } from '@golevelup/ts-jest';
import { mockCryptocurrencies } from '../mocks';

describe('FavoriteCryptocurrencyService', () => {
  const mongooseTestModule = new MongooseTestModule();

  let moduleRef: TestingModule;
  let favoriteCryptocurrencyService: FavoriteCryptocurrencyService;

  let favoriteCryptocurrencyModel: Model<FavoriteCryptocurrency>;

  const userId = '642dbb69f30c40a0e30c5531';

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        mongooseTestModule.forRoot(),
        MongooseModule.forFeature([
          {
            name: FavoriteCryptocurrency.name,
            schema: FavoriteCryptocurrencySchema,
          },
        ]),
      ],
      providers: [
        FavoriteCryptocurrencyService,
        FavoriteCryptocurrencyRepository,
      ],
    })
      .useMocker(autoMocker)
      .compile();

    favoriteCryptocurrencyService =
      moduleRef.get<FavoriteCryptocurrencyService>(
        FavoriteCryptocurrencyService,
      );

    favoriteCryptocurrencyModel = moduleRef.get<Model<FavoriteCryptocurrency>>(
      getModelToken(FavoriteCryptocurrency.name),
    );
  });

  beforeEach(async () => {
    const favoriteCryptocurrency = {
      userId: userId,
      cryptocurrency: mockCryptocurrencies[0],
      isFavorite: false,
    };
    await favoriteCryptocurrencyModel.create(favoriteCryptocurrency);
  });

  afterEach(async () => {
    await favoriteCryptocurrencyModel.deleteMany({});
  });

  afterAll(async () => {
    const connection = await moduleRef.get(getConnectionToken());
    await connection.close();
    await mongooseTestModule.stop();
    await moduleRef.close();
  });

  describe('upsertFavoriteCryptocurrency', () => {
    it('should update existing favorite cryptocurrency', async () => {
      // given
      const payload = {
        userId: userId,
        cryptocurrency: mockCryptocurrencies[0],
        isFavorite: true,
      };

      // when
      const { status, data, error } =
        await favoriteCryptocurrencyService.upsertFavoriteCryptocurrency(
          payload,
        );

      // then
      expect(status).toEqual(200);
      expect(data?.cryptocurrency.uuid).toEqual(mockCryptocurrencies[0].uuid);
      expect(data?.isFavorite).toEqual(true);
      expect(error).toEqual([]);
    });

    it('should create new favorite cryptocurrency if not exists', async () => {
      // given
      const payload = {
        userId: userId,
        cryptocurrency: mockCryptocurrencies[1],
        isFavorite: true,
      };

      // when
      const { status, data, error } =
        await favoriteCryptocurrencyService.upsertFavoriteCryptocurrency(
          payload,
        );

      // then
      expect(status).toEqual(200);
      expect(data?.cryptocurrency.uuid).toEqual(mockCryptocurrencies[1].uuid);
      expect(data?.isFavorite).toEqual(true);
      expect(error).toEqual([]);
    });
  });
  describe('getFavoriteCryptocurrencies', () => {
    it('should get favorite cryptocurrencies', async () => {
      // given
      const payload = {
        userId,
      };

      // when
      const { status, data, error } =
        await favoriteCryptocurrencyService.getFavoriteCryptocurrencies(
          payload,
        );

      // then
      expect(status).toEqual(200);
      expect(data?.length).toEqual(1);
      expect(data?.[0].cryptocurrency.uuid).toEqual(
        mockCryptocurrencies[0].uuid,
      );
      expect(data?.[0].isFavorite).toEqual(false);
      expect(error).toEqual([]);
    });

    it('should return empty array if no favorite cryptocurrencies found', async () => {
      // given
      const payload = {
        userId: '642dbb69f30c40a0e30c5533',
      };

      // when
      const { status, data, error } =
        await favoriteCryptocurrencyService.getFavoriteCryptocurrencies(
          payload,
        );

      // then
      expect(status).toEqual(200);
      expect(data?.length).toEqual(0);
      expect(error).toEqual([]);
    });
  });
});
