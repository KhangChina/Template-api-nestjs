/**
* Author : khang.nguyen@htgsoft.com
* Setup : 17/11/2022
*/

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const AuthBearer = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { headers } = ctx.switchToHttp().getRequest();

    return headers.authorization.split(' ')[1];
  },
);

export default AuthBearer;
