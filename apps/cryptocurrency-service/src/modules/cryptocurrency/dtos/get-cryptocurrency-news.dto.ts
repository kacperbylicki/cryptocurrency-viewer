import {
  CryptocurrencyNews,
  GetCryptocurrencyNewsRequest as IGetCryptocurrencyNewsRequest,
  GetCryptocurrencyNewsResponse as IGetCryptocurrencyNewsResponse,
} from '@cryptocurrency-viewer/transport';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetCryptocurrencyNewsRequest
  implements IGetCryptocurrencyNewsRequest
{
  @IsNotEmpty()
  @IsString()
  category!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(100)
  limit!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;
}

export class GetCryptocurrencyNewsResponse
  implements IGetCryptocurrencyNewsResponse
{
  status!: number;
  error!: string[];
  data!: CryptocurrencyNews[];
}
