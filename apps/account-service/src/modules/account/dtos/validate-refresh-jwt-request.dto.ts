import { IsJWT, IsNotEmpty } from 'class-validator';
import { ValidateRefreshJwtRequest } from '@cryptocurrency-viewer/transport';

export class ValidateRefreshJwtRequestDto implements ValidateRefreshJwtRequest {
  @IsJWT()
  @IsNotEmpty()
  refreshToken!: string;
}
