import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions } from '@nestjs/microservices';
import { iamConfig } from '@immensus/data-access-services';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, iamConfig);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}

bootstrap();
