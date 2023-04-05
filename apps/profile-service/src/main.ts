/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions } from '@nestjs/microservices';
import { profileConfig } from '@immensus/data-access-services';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, profileConfig);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}

bootstrap();
