/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 19/08/2022
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
