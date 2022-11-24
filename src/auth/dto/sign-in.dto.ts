/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 22/08/2022
 */


 import { ApiProperty } from '@nestjs/swagger';
 import {
   IsEmail,
   IsNotEmpty,
   IsString,
   MaxLength,
   MinLength,
 } from 'class-validator';

 export default class SignInDto {
   constructor(body: SignInDto | null = null) {
     if (body) {
       this.username = body.username;
       this.password = body.password;
     }
   }
 
   @ApiProperty({ type: String , example:"khang.nguyenn"})
   @IsNotEmpty()
   @IsString()
   @MinLength(3)
   @MaxLength(128)
   readonly username: string = '';
 
   @ApiProperty({ type: String,example:"duc@linh123" })
   @IsNotEmpty()
   @IsString()
   @MinLength(8)
   @MaxLength(64)
   readonly password: string = '';

 }
 