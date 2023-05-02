import {
  FavoriteCryptocurrency,
  GetFavoriteCryptocurrenciesRequest,
  GetFavoriteCryptocurrenciesResponse,
} from '@cryptocurrency-viewer/transport';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetFavoriteCryptocurrenciesRequestDto
  implements GetFavoriteCryptocurrenciesRequest
{
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId!: string;
}

export class GetFavoriteCryptocurrenciesResponseDto
  implements GetFavoriteCryptocurrenciesResponse
{
  status!: number;
  error!: string[];
  data!: Omit<FavoriteCryptocurrency, 'userId'>[];
}
