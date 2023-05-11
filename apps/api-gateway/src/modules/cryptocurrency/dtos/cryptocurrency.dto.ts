import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CryptocurrencyDto {
  @ApiProperty({
    type: String,
    example: `ab3e825e-a542-49ba-8aaa-2340deecc2b0`,
  })
  uuid!: string;

  @ApiProperty({ type: String, example: `-0.98%` })
  change!: string;

  @ApiProperty({ type: String, example: `https://example.com/bitcoin.jpg` })
  iconUrl!: string;

  @ApiProperty({ type: String, example: `Bitcoin` })
  name!: string;

  @ApiProperty({ type: String, example: `22209` })
  price!: string;

  @ApiProperty({ type: Number, example: 1 })
  rank!: number;

  @ApiProperty({ type: String, example: `BTC` })
  symbol!: string;

  @ApiProperty({ type: [String], example: [] })
  sparkline!: string[];

  @ApiProperty({ type: String, example: '1000000000' })
  marketCap!: string;

  @ApiProperty({ type: String, example: '1000' })
  dailyVolume!: string;
}

export class GetCryptocurrenciesDto {
  @ApiProperty({ type: String, example: '' })
  timePeriod!: string;

  @ApiProperty({ type: Number, example: 10 })
  tiers!: number;

  @ApiProperty({ type: String, example: '' })
  orderBy!: string;

  @ApiProperty({ type: String, example: '' })
  orderDirection!: string;

  @ApiProperty({ type: Number, example: 10 })
  limit!: number;

  @ApiPropertyOptional({ type: Number, example: 1 })
  offset?: number;
}

export class GetCryptocurrencyDto {
  @ApiProperty({ type: String, example: '' })
  timePeriod!: string;
}

export class GetCryptocurrencyHistoryRequestDto {
  @ApiProperty({ type: String, example: '' })
  timePeriod!: string;
}

export class GetCryptocurrencyNewsRequestDto {
  @ApiProperty({ type: String, example: '' })
  category!: string;

  @ApiProperty({ type: Number, example: '' })
  limit!: number;

  @ApiProperty({ type: Number, example: '' })
  offset?: number;
}
