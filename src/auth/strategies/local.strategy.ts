/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 22/08/2022
 */

 import { Strategy } from 'passport-local';
 import { validate } from 'class-validator';
 import { Request as ExpressRequest } from 'express';
 import { PassportStrategy } from '@nestjs/passport';
 import { ValidationError, Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
 import SignInDto from '../dto/sign-in.dto';
import { AuthService } from '../auth.service';



 
 @Injectable()
 export default class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(private authService: AuthService) {
     super({
       usernameField: 'username',
       passwordField: 'password',
       passReqToCallback: true,
     });
   }
 
   async validate(req: ExpressRequest, username: string, password: string){
     const errors = await validate(new SignInDto(req.body)) as ValidationError[];
     if (errors.length > 0) {
        throw new HttpException(`${errors}`, HttpStatus.BAD_REQUEST);
     }
     const user = await this.authService.validateUser(username, password);
     if (!user) {
       throw new UnauthorizedException('Incorrect email or password');
     }
     return user;
   }
 }
 