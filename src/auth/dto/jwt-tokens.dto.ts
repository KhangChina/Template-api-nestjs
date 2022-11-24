/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 22/08/2022
 */

 import { ApiProperty } from '@nestjs/swagger';

 export default class JwtTokensDto {
   @ApiProperty({
     type: String,
     example:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJraGFuZy5uZ3V5ZW5AaHRnc29mdC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NjE0MTgyMDIsImV4cCI6MTY2MTQxODUwMn0.ERsi084IpeGNoaW8CcKFrsJzA79YPI2WjgdP3AQDN-4"
   })
    accessToken: string;
 
   @ApiProperty({
     type: String,
     example:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJraGFuZy5uZ3V5ZW5AaHRnc29mdC5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NjE0MTgyMDIsImV4cCI6MTY2MjAyMzAwMn0.20MNmK49V-S7U_xrUfX_-l8kuZs7t0rIeoxJwtCVeoU"
   })
    refreshToken: string;
 }
 