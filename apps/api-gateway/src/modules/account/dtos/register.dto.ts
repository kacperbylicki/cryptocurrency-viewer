import { ApiProperty } from '@nestjs/swagger';
import {
  RegisterRequest,
  RegisterResponse,
} from '@cryptocurrency-viewer/transport';

export class RegisterRequestDto implements RegisterRequest {
  @ApiProperty({ type: String, example: `john.doe@mail.com` })
  public email!: string;

  @ApiProperty({ type: String, example: `johndoe` })
  public username!: string;

  @ApiProperty({ type: String, example: `kigrHXCxAJ2azFhyXPFy` })
  public password!: string;

  @ApiProperty({ type: String, example: `kigrHXCxAJ2azFhyXPFy` })
  public confirmPassword!: string;
}

export class RegisterResponseDto implements RegisterResponse {
  @ApiProperty({ type: Number, example: 201 })
  status!: number;

  @ApiProperty({ type: [String], example: ['something went wrong'] })
  error?: string[];
}
