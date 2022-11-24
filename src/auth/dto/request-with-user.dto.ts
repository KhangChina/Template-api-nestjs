/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 22/08/2022
 */
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';


export class WithUserEntityRequestDto<T> extends Request {
  user?: User;

  newProp?: T;
}
