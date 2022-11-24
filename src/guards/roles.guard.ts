import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
/**
* Author : khang.nguyen@htgsoft.com
* Setup : 22/08/2022
*/

import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RolesEnum } from 'src/decorators/roles.decorator';
import { JwtDecodeResponse } from 'src/interfaces/jwt-decode-response.interface';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const tokenData = (await this.jwtService
      .decode(request.headers.authorization?.split('Bearer')[1].trim() as string) as JwtDecodeResponse | null);
    if (tokenData?.role === RolesEnum.admin) {
      return true;
    }
    return !tokenData ? false : roles.includes(tokenData?.role);
  }
}
