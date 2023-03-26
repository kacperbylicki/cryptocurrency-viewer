import { IsJWT, IsNotEmpty } from 'class-validator';
import { ValidateJwtRequest } from '@cryptocurrency-viewer/transport';

export class ValidateJwtRequestDto implements ValidateJwtRequest {
  @IsJWT()
  @IsNotEmpty()
  accessToken!: string;
}
