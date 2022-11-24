/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 19/08/2022
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class LocalAuthGuard extends AuthGuard('local') { }
