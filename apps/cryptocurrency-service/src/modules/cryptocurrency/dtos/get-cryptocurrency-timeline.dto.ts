import {
  Cryptocurrency,
  GetCryptocurrencyTimelineRequest as IGetCryptocurrencyTimelineRequest,
  GetCryptocurrencyTimelineResponse as IGetCryptocurrencyTimelineResponse,
} from '@cryptocurrency-viewer/transport';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetCryptocurrencyTimelineRequest
  implements IGetCryptocurrencyTimelineRequest
{
  @IsUUID()
  @IsNotEmpty()
  cryptocurrencyId!: string;

  @IsString()
  @IsNotEmpty()
  timePeriod!: string;
}

export class GetCryptocurrencyTimelineResponse
  implements IGetCryptocurrencyTimelineResponse
{
  status!: number;
  error!: string[];
  data?: Cryptocurrency;
}
