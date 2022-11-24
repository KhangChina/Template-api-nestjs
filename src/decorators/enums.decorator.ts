/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 22/08/2022
 */
import { SetMetadata } from '@nestjs/common';

export enum OwnerTypesEnum {
  ADMIN = 'admin',
  USER = 'user',
}
export const OwnerTypes = (...ownerTypes: OwnerTypesEnum[]) => SetMetadata('ownerTypes', ownerTypes);
