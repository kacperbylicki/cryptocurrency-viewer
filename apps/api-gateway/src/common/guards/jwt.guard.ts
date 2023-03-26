import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '../../modules/account/services/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  @Inject(JwtService)
  public readonly service!: JwtService;

  public async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | never {
    const request = context.switchToHttp().getRequest();
    const { authorization: authorizationHeader } = request.headers;

    if (!authorizationHeader) {
      throw new UnauthorizedException();
    }

    const [_, accessToken] = authorizationHeader.split(' ');

    if (!accessToken || accessToken.length < 100) {
      throw new UnauthorizedException();
    }

    const { data: validationResponse } = await this.service.validate({
      accessToken,
    });

    if (!validationResponse?.isValid) {
      throw new UnauthorizedException();
    }

    request.user = { accountId: validationResponse?.accountId };

    return !!(validationResponse?.isValid && validationResponse?.accountId);
  }
}