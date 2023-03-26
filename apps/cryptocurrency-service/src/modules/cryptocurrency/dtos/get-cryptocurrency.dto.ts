import {
  Cryptocurrency,
  GetCryptocurrencyRequest as IGetCryptocurrencyRequest,
  GetCryptocurrencyResponse as IGetCryptocurrencyResponse,
} from '@cryptocurrency-viewer/transport';
import { IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetCryptocurrencyRequest implements IGetCryptocurrencyRequest {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  cryptocurrencyId!: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['24h', '7d', '30d'])
  timePeriod!: string;
}

export class GetCryptocurrencyResponse implements IGetCryptocurrencyResponse {
  status!: number;
  error!: string[];
  data?: Cryptocurrency;
}
