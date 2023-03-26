import {
  CryptocurrencyHistory,
  GetCryptocurrencyHistoryRequest as IGetCryptocurrencyHistoryRequest,
  GetCryptocurrencyHistoryResponse as IGetCryptocurrencyHistoryResponse,
} from '@cryptocurrency-viewer/transport';
import { IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetCryptocurrencyHistoryRequest
  implements IGetCryptocurrencyHistoryRequest
{
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  cryptocurrencyId!: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['24h', '7d', '30d'])
  timePeriod!: string;
}

export class GetCryptocurrencyHistoryResponse
  implements IGetCryptocurrencyHistoryResponse
{
  status!: number;
  error!: string[];
  data?: CryptocurrencyHistory;
}
