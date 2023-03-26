import {
  CryptocurrencyNews,
  GetCryptocurrencyNewsRequest as IGetCryptocurrencyNewsRequest,
  GetCryptocurrencyNewsResponse as IGetCryptocurrencyNewsResponse,
} from '@cryptocurrency-viewer/transport';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

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
}

export class GetCryptocurrencyNewsResponse
  implements IGetCryptocurrencyNewsResponse
{
  status!: number;
  error!: string[];
  data!: CryptocurrencyNews[];
}
