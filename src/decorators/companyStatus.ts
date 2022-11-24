/**
* Author : khang.nguyen@htgsoft.com
* Setup : 26/08/2022
*/

import { SetMetadata } from '@nestjs/common';

export enum CompanyStatusEnum {
    enable  = 'Enable',
    disable  = 'Disable',
    delete = 'Delete'
}
export const CompanyStatus = (...userStatus: CompanyStatusEnum[]) => SetMetadata('companyStatusEnum', CompanyStatusEnum);