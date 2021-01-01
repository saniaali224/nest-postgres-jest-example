import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application started on port ${port}`);

}
bootstrap();
