import { ApiProperty } from '@nestjs/swagger';
import {
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@cryptocurrency-viewer/transport';

export class RefreshTokenRequestDto
  implements Pick<RefreshTokenRequest, 'refreshToken'>
{
  @ApiProperty({ example: `` })
  refreshToken!: string;
}

class RefreshTokenResponseData {
  @ApiProperty({
    example: `eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VFb0qJ1LRg_4ujbZoRMXnVkUgiuKq5KxWqNdbKq_G9Vvz-S1zZa9LPxtHWKa64zDl2ofkT8F6jBt_K4riU-fPg`,
  })
  accessToken!: string;

  @ApiProperty({
    example: `eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VFb0qJ1LRg_4ujbZoRMXnVkUgiuKq5KxWqNdbKq_G9Vvz-S1zZa9LPxtHWKa64zDl2ofkT8F6jBt_K4riU-fPg`,
  })
  refreshToken!: string;
}

export class RefreshTokenResponseDto implements RefreshTokenResponse {
  @ApiProperty({ example: 200 })
  status!: number;

  @ApiProperty({ example: ['unauthorized'] })
  error!: string[];

  @ApiProperty({ type: RefreshTokenResponseData })
  data!: RefreshTokenResponseData;
}
