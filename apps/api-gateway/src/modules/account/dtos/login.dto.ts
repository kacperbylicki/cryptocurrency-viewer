import { ApiProperty } from '@nestjs/swagger';
import { LoginRequest, LoginResponse } from '@cryptocurrency-viewer/transport';

export class LoginRequestDto implements LoginRequest {
  @ApiProperty({ example: `john.doe@mail.com` })
  public email!: string;

  @ApiProperty({ example: `kigrHXCxAJ2azFhyXPFy` })
  public password!: string;
}

class LoginResponseData {
  @ApiProperty({
    type: String,
    example: `eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VFb0qJ1LRg_4ujbZoRMXnVkUgiuKq5KxWqNdbKq_G9Vvz-S1zZa9LPxtHWKa64zDl2ofkT8F6jBt_K4riU-fPg`,
  })
  accessToken!: string;

  @ApiProperty({
    type: String,
    example: `eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VFb0qJ1LRg_4ujbZoRMXnVkUgiuKq5KxWqNdbKq_G9Vvz-S1zZa9LPxtHWKa64zDl2ofkT8F6jBt_K4riU-fPg`,
  })
  refreshToken!: string;
}

export class LoginResponseDto implements LoginResponse {
  @ApiProperty({ type: Number, example: 200 })
  status!: number;

  @ApiProperty({ type: [String], example: ['unauthorized'] })
  error!: string[];

  @ApiProperty({ type: () => LoginResponseData })
  data!: LoginResponseData;
}
