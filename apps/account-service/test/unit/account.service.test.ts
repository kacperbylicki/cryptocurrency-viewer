// import { Account } from '../../src/modules/account/entities/account.entity';
// import { AccountRepository } from '../../src/modules/account/repositories/account.repository';
// import { AccountService } from '../../src/modules/account/services/account.service';
// import { GetAccountResponse } from '@cryptocurrency-viewer/transport';
// import { HttpStatus } from '@nestjs/common';
// import { Test } from '@nestjs/testing';
// import { createMock } from '@golevelup/ts-jest';
// // import { AuthService } from 'src/modules/account/service/auth.service';

// describe('AccountService', () => {
//   let accountService: AccountService;
//   //   let authService: AuthService;
//   let accountRepository: AccountRepository;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       providers: [AccountService],
//     })
//       .useMocker(createMock)
//       .compile();

//     accountService = moduleRef.get<AccountService>(AccountService);
//     // authService = moduleRef.get<AuthService>(AuthService);
//     accountRepository = moduleRef.get<AccountRepository>(AccountRepository);
//   });

//   describe('findById', () => {
//     it('should return null if account does not exist', async () => {
//       // given
//       const uuid = '123';

//       // when
//       jest.spyOn(accountRepository, 'findById').mockResolvedValueOnce(null);
//       const result = await accountService.findById(uuid);

//       // then
//       expect(result).toBeNull();
//       expect(accountRepository.findById).toHaveBeenCalledWith(uuid);
//     });

//     it('should return the account if it exists', async () => {
//       // given
//       const uuid = '123';
//       const account: Account = {
//         uuid,
//         email: 'test@test.com',
//         username: 'test',
//         password: 'password',
//         createdAt: 123,
//         updatedAt: 456,
//       };

//       // when
//       jest.spyOn(accountRepository, 'findById').mockResolvedValueOnce(account);
//       const result = await accountService.findById(uuid);

//       // then
//       expect(result).toEqual(account);
//       expect(accountRepository.findById).toHaveBeenCalledWith(uuid);
//     });
//   });

//   describe('findByEmail', () => {
//     it('should return null if account does not exist', async () => {
//       // given
//       const email = 'test@test.com';

//       // when
//       jest.spyOn(accountRepository, 'findByEmail').mockResolvedValueOnce(null);
//       const result = await accountService.findByEmail(email);

//       // then
//       expect(result).toBeNull();
//       expect(accountRepository.findByEmail).toHaveBeenCalledWith(email);
//     });

//     it('should return the account if it exists', async () => {
//       // given
//       const email = 'test@test.com';
//       const account: Account = {
//         uuid: '123',
//         email,
//         username: 'test',
//         password: 'password',
//         createdAt: 123,
//         updatedAt: 456,
//       };

//       // when
//       jest
//         .spyOn(accountRepository, 'findByEmail')
//         .mockResolvedValueOnce(account);
//       const result = await accountService.findByEmail(email);

//       // then
//       expect(result).toEqual(account);
//       expect(accountRepository.findByEmail).toHaveBeenCalledWith(email);
//     });
//   });

//   describe('getCurrentAccount', () => {
//     it('should return the current account', async () => {
//       // given
//       const accountId = '123';
//       const account: Account = {
//         uuid: accountId,
//         email: 'test@test.com',
//         username: 'test',
//         password: 'password',
//         createdAt: 123,
//         updatedAt: 456,
//       };
//       const expectedResponse: GetAccountResponse = {
//         status: HttpStatus.OK,
//         data: account,
//       };

//       // when
//       jest.spyOn(accountService, 'findById').mockResolvedValueOnce(account);
//       const result = await accountService.getCurrentAccount(accountId);

//       // then
//       expect(result).toEqual(expectedResponse);
//       expect(accountService.findById).toHaveBeenCalledWith(accountId);
//     });
//   });
// });
export default {};
