// import {
//   CryptocurrencyController,
//   UpsertFavoriteCryptocurrencyRequestDto,
// } from '@/modules';
// import {
//   CryptocurrencyServiceClient,
//   GetFavoriteCryptocurrenciesResponse,
//   UpsertFavoriteCryptocurrencyResponse,
// } from '@cryptocurrency-viewer/transport';
// import { Observable } from 'rxjs';
// import { Test, TestingModule } from '@nestjs/testing';
// import { createMock } from '@golevelup/ts-jest';

// describe('CryptocurrencyController', () => {
//   let controller: CryptocurrencyController;
//   let client: CryptocurrencyServiceClient;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [CryptocurrencyController],
//     })
//       .useMocker(createMock)
//       .compile();

//     controller = module.get<CryptocurrencyController>(CryptocurrencyController);
//     client = module.get<CryptocurrencyServiceClient>(
//       CryptocurrencyServiceClient,
//     );
//   });

//   afterAll(() => {
//     jest.clearAllMocks();
//   });

//   describe('updateFavoriteCryptocurrency', () => {
//     it('should update user favorite cryptocurrency', async () => {
//       // Arrange
//       const accountId = 'user1';
//       const dto: UpsertFavoriteCryptocurrencyRequestDto = {
//         cryptocurrency: {
//           uuid: 'uuid',
//           name: 'name',
//           symbol: 'symbol',
//           change: '-0.98%',
//           price: '123.45',
//           rank: 1,
//           iconUrl: 'https://example.com/icon.png',
//         },
//         isFavorite: true,
//       };
//       const expectedResponse =
//         new Observable<UpsertFavoriteCryptocurrencyResponse>();

//       // Act
//       jest
//         .spyOn(client, 'upsertFavoriteCryptocurrency')
//         .mockReturnValue(expectedResponse);
//       const result = await controller.updateFavoriteCryptocurrency(
//         accountId,
//         dto,
//       );

//       // Assert
//       expect(client.upsertFavoriteCryptocurrency).toHaveBeenCalledWith({
//         ...dto,
//         userId: accountId,
//       });
//       expect(result).toBe(expectedResponse);
//     });
//   });

//   describe('getFavoriteCryptocurrencies', () => {
//     it('should return user favorite cryptocurrencies', async () => {
//       // Arrange
//       const accountId = 'user1';
//       const expectedResponse =
//         new Observable<GetFavoriteCryptocurrenciesResponse>();

//       // Act
//       jest
//         .spyOn(client, 'getFavoriteCryptocurrencies')
//         .mockReturnValue(expectedResponse);
//       const result = await controller.getFavoriteCryptocurrencies(accountId);

//       // Assert
//       expect(client.getFavoriteCryptocurrencies).toHaveBeenCalledWith({
//         userId: accountId,
//       });
//       expect(result).toBe(expectedResponse);
//     });
//   });
// });
export {};
