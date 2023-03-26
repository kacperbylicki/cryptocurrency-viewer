import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '../../modules/account/services/jwt.service';

@Injectable()
export class RefreshJwtAuthGuard implements CanActivate {
  @Inject(JwtService)
  public readonly service!: JwtService;

  public async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | never {
    const request = context.switchToHttp().getRequest();
    const { refreshToken } = request.body;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const { data: validationResponse } =
      await this.service.validateRefreshToken({ refreshToken });

    if (!validationResponse?.isValid) {
      throw new UnauthorizedException();
    }

    request.user = { accountId: validationResponse?.accountId };

    return !!(validationResponse?.isValid && validationResponse?.accountId);
  }
}