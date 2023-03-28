import { ApiProperty } from '@nestjs/swagger';
import { CryptocurrencyDto } from './cryptocurrency.dto';
import { UpsertFavoriteCryptocurrencyRequest } from '@cryptocurrency-viewer/transport';

export class UpsertFavoriteCryptocurrencyRequestDto
  implements Omit<UpsertFavoriteCryptocurrencyRequest, 'userId'>
{
  @ApiProperty({
    description: 'Cryptocurrency we want to add or update',
    type: () => CryptocurrencyDto,
  })
  public cryptocurrency!: CryptocurrencyDto;

  @ApiProperty({ type: Boolean, example: true })
  public isFavorite!: boolean;
}
