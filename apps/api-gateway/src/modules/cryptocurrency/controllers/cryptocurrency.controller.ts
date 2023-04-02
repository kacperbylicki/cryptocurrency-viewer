import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CryptocurrencyServiceClient,
  GetCryptocurrenciesResponse,
  GetCryptocurrencyHistoryResponse,
  GetCryptocurrencyNewsResponse,
  GetCryptocurrencyResponse,
  GetFavoriteCryptocurrenciesResponse,
  UpsertFavoriteCryptocurrencyResponse,
} from '@cryptocurrency-viewer/transport';
import {
  GetCryptocurrenciesDto,
  GetCryptocurrencyDto,
  GetCryptocurrencyHistoryRequestDto,
  GetCryptocurrencyNewsRequestDto,
  UpsertFavoriteCryptocurrencyRequestDto,
} from '../dtos';
import {
  HttpStatusInterceptor,
  JwtAuthGuard,
  Public,
  RequestAccountId,
  TimeoutInterceptor,
} from '@/common';
import { Observable } from 'rxjs';

@Controller('cryptocurrencies')
@ApiTags(CryptocurrencyController.name)
@UseInterceptors(TimeoutInterceptor, HttpStatusInterceptor)
export class CryptocurrencyController {
  public constructor(private readonly client: CryptocurrencyServiceClient) {}

  @UseGuards(JwtAuthGuard)
  @Put('favorite')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: `Invalid token` })
  @ApiOkResponse({
    description: `User's favorite cryptocurrency added or removed`,
  })
  @ApiBearerAuth()
  async updateFavoriteCryptocurrency(
    @RequestAccountId() accountId: string,
    @Body() dto: UpsertFavoriteCryptocurrencyRequestDto,
  ): Promise<Observable<UpsertFavoriteCryptocurrencyResponse>> {
    return this.client.upsertFavoriteCryptocurrency({
      ...dto,
      userId: accountId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorite')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: `Invalid token` })
  @ApiOkResponse({ description: `User's favorited cryptocurrencies retrived` })
  @ApiBearerAuth()
  async getFavoriteCryptocurrencies(
    @RequestAccountId() accountId: string,
  ): Promise<Observable<GetFavoriteCryptocurrenciesResponse>> {
    return this.client.getFavoriteCryptocurrencies({ userId: accountId });
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: '' })
  async getCryptocurrencies(
    @Query() queryParams: GetCryptocurrenciesDto,
  ): Promise<Observable<GetCryptocurrenciesResponse>> {
    return this.client.getCryptocurrencies(queryParams);
  }

  @Public()
  @Get(':cryptocurrencyId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: '' })
  async getCryptocurrency(
    @Param('cryptocurrencyId') cryptocurrencyId: string,
    @Query() queryParams: GetCryptocurrencyDto,
  ): Promise<Observable<GetCryptocurrencyResponse>> {
    return this.client.getCryptocurrency({ cryptocurrencyId, ...queryParams });
  }

  @Public()
  @Get(':cryptocurrencyId/history')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: '' })
  async getCryptocurrencyHistory(
    @Param('cryptocurrencyId') cryptocurrencyId: string,
    @Query() queryParams: GetCryptocurrencyHistoryRequestDto,
  ): Promise<Observable<GetCryptocurrencyHistoryResponse>> {
    return this.client.getCryptocurrencyHistory({
      cryptocurrencyId,
      ...queryParams,
    });
  }

  @Public()
  @Get('news')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: '' })
  async getCryptocurrencyNews(
    @Query() queryParams: GetCryptocurrencyNewsRequestDto,
  ): Promise<Observable<GetCryptocurrencyNewsResponse>> {
    return this.client.getCryptocurrencyNews(queryParams);
  }
}
