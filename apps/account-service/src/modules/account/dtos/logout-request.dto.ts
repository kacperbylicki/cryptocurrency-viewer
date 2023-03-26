import { IsNotEmpty, IsUUID } from 'class-validator';
import { LogoutRequest } from '@cryptocurrency-viewer/transport';

export class LogoutRequestDto implements LogoutRequest {
  @IsUUID()
  @IsNotEmpty()
  accountId!: string;
}
