import 'dotenv/config'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
    name: 'core',
    type: 'mssql',
    host: process.env.DATABASE_HOST,//process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    extra: {
      charset: "utf8",
      trustServerCertificate: true, //is here sql server
    },
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: false, //Create new tb and lose data
    logging: true
  }),
  AuthModule,
  CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {
  // constructor (private dataSource: DataSource){}
  }
