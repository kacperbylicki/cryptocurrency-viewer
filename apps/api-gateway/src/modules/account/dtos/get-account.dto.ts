import { Account, GetAccountResponse } from '@cryptocurrency-viewer/transport';
import { ApiProperty } from '@nestjs/swagger';

export class AccountDto implements Account {
  @ApiProperty({
    type: String,
    example: '826eaf81-0a12-49e2-ba56-ce75fa9c9a15',
  })
  uuid!: string;

  @ApiProperty({ type: String, example: 'john.doe@mail.com' })
  email!: string;

  @ApiProperty({ type: String, example: 'johndoe' })
  username!: string;
}

export class GetAccountResponseDto implements GetAccountResponse {
  @ApiProperty({ type: Number, example: 200 })
  status!: number;

  @ApiProperty({ type: [String], example: ['unauthorized'] })
  error?: string[];

  @ApiProperty({ type: () => AccountDto })
  data?: AccountDto | null;
}
