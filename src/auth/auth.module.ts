/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 19/08/2022
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import authConstants from './auth-constants';
import LocalStrategy from './strategies/local.strategy';
import JwtAccessStrategy from './strategies/jwt-access.strategy';
import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [
    UsersModule,
    CustomersModule,
    PassportModule,
    JwtModule.register({
      secret: authConstants.jwt.secret,
      signOptions: { expiresIn: authConstants.jwt.expirationTime.accessToken },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtAccessStrategy,JwtRefreshStrategy]
})
export class AuthModule {}
