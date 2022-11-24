/**
* Author : khang.nguyen@htgsoft.com
* Setup : 22/08/2022
*/

import { SetMetadata } from '@nestjs/common';

export enum UserStatusEnum {
    active = 'Active',
    activated = 'Activated',
    cancelled = 'Cancelled',
    deleted = 'Deleted'
}
export const UserStatus = (...userStatus: UserStatusEnum[]) => SetMetadata('userStatus', UserStatus);