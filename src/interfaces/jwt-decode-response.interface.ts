/**
* Author : khang.nguyen@htgsoft.com
* Setup : 22/08/2022
*/

import { RolesEnum } from "src/decorators/roles.decorator";



export interface JwtDecodeResponse {
  id: string,
  email: string,
  role: RolesEnum,
  iat: number,
  exp: number,
}
