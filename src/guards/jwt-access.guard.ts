/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 22/08/2022
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtAccessGuard extends AuthGuard('accessToken') {
  handleRequest(err: any, user: any) {
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
