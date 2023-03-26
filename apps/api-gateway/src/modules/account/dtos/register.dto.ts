import { ApiProperty } from '@nestjs/swagger';
import { RegisterRequest } from '@cryptocurrency-viewer/transport';

export class RegisterRequestDto implements RegisterRequest {
  @ApiProperty({ example: `john.doe@mail.com` })
  public email!: string;

  @ApiProperty({ example: `johndoe` })
  public username!: string;

  @ApiProperty({ example: `kigrHXCxAJ2azFhyXPFy` })
  public password!: string;

  @ApiProperty({ example: `kigrHXCxAJ2azFhyXPFy` })
  public confirmPassword!: string;
}
