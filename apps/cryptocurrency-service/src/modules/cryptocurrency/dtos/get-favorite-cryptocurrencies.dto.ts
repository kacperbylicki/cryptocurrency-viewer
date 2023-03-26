import {
  FavoriteCryptocurrency,
  GetFavoriteCryptocurrenciesRequest as IGetFavoriteCryptocurrenciesRequest,
  GetFavoriteCryptocurrenciesResponse as IGetFavoriteCryptocurrenciesResponse,
} from '@cryptocurrency-viewer/transport';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetFavoriteCryptocurrenciesRequest
  implements IGetFavoriteCryptocurrenciesRequest
{
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId!: string;
}

export class GetFavoriteCryptocurrenciesResponse
  implements IGetFavoriteCryptocurrenciesResponse
{
  status!: number;
  error!: string[];
  data!: FavoriteCryptocurrency[];
}
