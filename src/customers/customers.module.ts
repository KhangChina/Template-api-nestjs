import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import authConstants from 'src/auth/auth-constants';

@Module({
  imports:[JwtModule.register({
    secret: authConstants.jwt.secret,
  })],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports:[CustomersService]
})
export class CustomersModule {}
