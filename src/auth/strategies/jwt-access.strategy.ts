/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 22/08/2022
 */

 import { ExtractJwt, Strategy } from 'passport-jwt';
 import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import authConstants from '../auth-constants';

 
 export default class JwtAccessStrategy extends PassportStrategy(Strategy, 'accessToken') {
   constructor() {
     super({
       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
       ignoreExpiration: false,
       secretOrKey: authConstants.jwt.secrets.accessToken,
     });
   }
 
   async validate(payload: User){
     return {
       id: payload.id || payload.id,
       email: payload.email,
       role: payload.role,
     };
   }
 }
 