/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 19/08/2022
 */
import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    //return this.appService.getHello();
  }
}
