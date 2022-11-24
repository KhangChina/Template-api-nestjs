/**
* Author : khang.nguyen@htgsoft.com
* Setup : 22/08/2022
*/

import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export default class WrapResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((...args) => {
          // if this an error response then return first object if no then second..
          return {
            data: args[0],
          };
        }),
      );
    }
  }
  