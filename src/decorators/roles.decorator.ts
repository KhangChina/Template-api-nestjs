/**
* Author : khang.nguyen@htgsoft.com
* Setup : 22/08/2022
*/

import { SetMetadata } from '@nestjs/common';

export enum RolesEnum {
  admin = 'Admin',
  customer = 'Customer', //Khách hàng
  staff = 'Staff', //"Quản lý"

}
export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
