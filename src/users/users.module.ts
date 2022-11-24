/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 22/08/2022
 */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config'
import { JwtModule } from '@nestjs/jwt';
import authConstants from 'src/auth/auth-constants';
@Module({
  imports: [TypeOrmModule.forFeature([User],process.env.DATABASE_PROVIDER_NAME), JwtModule.register({
    secret: authConstants.jwt.secret,
  })],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
