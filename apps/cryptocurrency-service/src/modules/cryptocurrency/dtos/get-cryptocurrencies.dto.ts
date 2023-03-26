import {
  Cryptocurrency,
  GetCryptocurrenciesRequest as IGetCryptocurrenciesRequest,
  GetCryptocurrenciesResponse as IGetCryptocurrenciesResponse,
} from '@cryptocurrency-viewer/transport';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetCryptocurrenciesRequest implements IGetCryptocurrenciesRequest {
  @IsNotEmpty()
  @IsString()
  @IsIn(['24h', '7d', '30d'])
  timePeriod!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  tiers!: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['marketCap', 'volume', 'price'])
  orderBy!: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['asc', 'desc'])
  orderDirection!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(100)
  limit!: number;

  @IsNumber()
  @Min(1)
  offset!: number;
}

export class GetCryptocurrenciesResponse
  implements IGetCryptocurrenciesResponse
{
  status!: number;
  error!: string[];
  data!: Cryptocurrency[];
}
