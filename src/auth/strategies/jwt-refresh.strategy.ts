/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 22/08/2022
 */

 import { ExtractJwt, Strategy } from 'passport-jwt';
 import { PassportStrategy } from '@nestjs/passport';
 import { Injectable } from '@nestjs/common';
 import authConstants from '../auth-constants';
import { User } from 'src/users/entities/user.entity';

 @Injectable()
 export default class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refreshToken') {
   constructor() {
     super({
       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
       ignoreExpiration: false,
       secretOrKey: authConstants.jwt.secrets.refreshToken,
     });
   }
 
   async validate(payload: User){
     return {
       id: payload.id,
       email: payload.email,
       role: payload.role,
     };
   }
 }
 