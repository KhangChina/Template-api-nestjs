/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 22/08/2022
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtRefreshGuard extends AuthGuard('refreshToken') { }
