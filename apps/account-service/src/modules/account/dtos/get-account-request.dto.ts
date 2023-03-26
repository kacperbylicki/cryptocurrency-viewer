import { GetAccountRequest } from '@cryptocurrency-viewer/transport';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetAccountRequestDto implements GetAccountRequest {
  @IsUUID()
  @IsNotEmpty()
  accountId!: string;
}
