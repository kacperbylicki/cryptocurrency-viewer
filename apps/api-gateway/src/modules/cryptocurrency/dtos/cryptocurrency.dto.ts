import { ApiProperty } from '@nestjs/swagger';

export class CryptocurrencyDto {
  @ApiProperty({ example: `ab3e825e-a542-49ba-8aaa-2340deecc2b0` })
  uuid!: string;

  @ApiProperty({ example: `-0.98%` })
  change!: string;

  @ApiProperty({ example: `https://example.com/bitcoin.jpg` })
  iconUrl!: string;

  @ApiProperty({ example: `Bitcoin` })
  name!: string;

  @ApiProperty({ example: `22209` })
  price!: string;

  @ApiProperty({ example: 1 })
  rank!: number;

  @ApiProperty({ example: `BTC` })
  symbol!: string;

  @ApiProperty({ example: [] })
  sparkline!: string[];

  @ApiProperty({ example: '1000000000' })
  marketCap!: string;

  @ApiProperty({ example: '1000' })
  dailyVolume!: string;
}

export class GetCryptocurrenciesDto {
  @ApiProperty({ example: '' })
  timePeriod!: string;

  @ApiProperty({ example: 10 })
  tiers!: number;

  @ApiProperty({ example: '' })
  orderBy!: string;

  @ApiProperty({ example: '' })
  orderDirection!: string;

  @ApiProperty({ example: 10 })
  limit!: number;

  @ApiProperty({ example: 0 })
  offset!: number;
}

export class GetCryptocurrencyDto {
  @ApiProperty({ example: '' })
  timePeriod!: string;
}

export class GetCryptocurrencyHistoryRequestDto {
  @ApiProperty({ example: '' })
  timePeriod!: string;
}

export class GetCryptocurrencyNewsRequestDto {
  @ApiProperty({ example: '' })
  category!: string;

  @ApiProperty({ example: '' })
  limit!: number;
}

export class GetCryptocurrencyTimelineRequestDto {
  @ApiProperty({ example: '' })
  timePeriod!: string;
}
