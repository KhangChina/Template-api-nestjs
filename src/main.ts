/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 19/08/2022
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config'

import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs'

async function bootstrap() {
  let app:any;
  if(process.env.ENV === 'production')
  {
    const keyFile = fs.readFileSync(`${process.env.SSL_KEY_PATH}`);
    const certFile = fs.readFileSync(`${process.env.SSL_CERT_PATH}`);
     app = await NestFactory.create(AppModule, {
      httpsOptions: {
        key: keyFile,
        cert: certFile,
      },
    });
  }
  else
  {
     app = await NestFactory.create(AppModule);
  }
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  //If set to true, validator will strip validated (returned) object of any properties that do not use any validation decorators.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true})); 

  const config = new DocumentBuilder()
  .setTitle('HTG.iHospital Portal API')
  .setDescription('HIS Dashboard Reports')
  .setVersion('1.0')
  .addServer(`${process.env.SERVER_SSL}`)
  .addServer(`${process.env.SERVER}`)
  .addBearerAuth({ in: 'header', type: 'http' })
  .build();

  const document = SwaggerModule.createDocument(app, config);

//#region 
const options = {
  explorer: false,
  customCss: fs.readFileSync(join(__dirname, '..', 'public/theme-swagger-3/theme-flattop.css'),'utf8'),
  customSiteTitle: 'API Documentation',
  customfavIcon: 'favicon.png'
};

SwaggerModule.setup('api-document', app, document,options);
//#endregion



  await app.listen(`${process.env.PORT}`);

  console.log('😈 Server environment: '+ process.env.ENV)
  console.log('😈 Server Port: '+ process.env.PORT)
  console.log(`😈 API HTG.iHospital Portal building Khang Nguyễn: ${process.env.SERVER}`)

}
bootstrap();
