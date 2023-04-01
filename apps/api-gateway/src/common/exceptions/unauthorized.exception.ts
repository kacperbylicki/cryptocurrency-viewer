import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(error: string[]) {
    super(
      {
        status: HttpStatus.UNAUTHORIZED,
        error,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
