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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CryptocurrencyServiceClient,
  GetCryptocurrenciesResponse,
  GetCryptocurrencyHistoryResponse,
  GetCryptocurrencyNewsResponse,
  GetCryptocurrencyResponse,
  GetCryptocurrencyTimelineResponse,
  GetFavoriteCryptocurrenciesResponse,
  UpsertFavoriteCryptocurrencyResponse,
} from '@cryptocurrency-viewer/transport';
import {
  GetCryptocurrenciesDto,
  GetCryptocurrencyDto,
  GetCryptocurrencyHistoryRequestDto,
  GetCryptocurrencyNewsRequestDto,
  GetCryptocurrencyTimelineRequestDto,
  UpsertFavoriteCryptocurrencyRequestDto,
} from '../dtos';
import {
  HttpStatusInterceptor,
  JwtAuthGuard,
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

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: '' })
  async getCryptocurrencies(
    @Body() dto: GetCryptocurrenciesDto,
  ): Promise<Observable<GetCryptocurrenciesResponse>> {
    return this.client.getCryptocurrencies(dto);
  }

  @Get(':cryptocurrencyId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: '' })
  async getCryptocurrency(
    @Param('cryptocurrencyId') cryptocurrencyId: string,
    @Body() dto: GetCryptocurrencyDto,
  ): Promise<Observable<GetCryptocurrencyResponse>> {
    return this.client.getCryptocurrency({ cryptocurrencyId, ...dto });
  }

  @Get(':cryptocurrencyId/history')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: '' })
  async getCryptocurrencyHistory(
    @Param('cryptocurrencyId') cryptocurrencyId: string,
    @Body() dto: GetCryptocurrencyHistoryRequestDto,
  ): Promise<Observable<GetCryptocurrencyHistoryResponse>> {
    return this.client.getCryptocurrencyHistory({ cryptocurrencyId, ...dto });
  }

  @Get('news')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: '' })
  async getCryptocurrencyNews(
    @Body() dto: GetCryptocurrencyNewsRequestDto,
  ): Promise<Observable<GetCryptocurrencyNewsResponse>> {
    return this.client.getCryptocurrencyNews(dto);
  }

  @Get(':cryptocurrencyId/timeline')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: '' })
  async getCryptocurrencyTimeline(
    @Param('cryptocurrencyId') cryptocurrencyId: string,
    @Body() dto: GetCryptocurrencyTimelineRequestDto,
  ): Promise<Observable<GetCryptocurrencyTimelineResponse>> {
    return this.client.getCryptocurrencyTimeline({ cryptocurrencyId, ...dto });
  }
}
