import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { postConfig } from '@immensus/data-access-services';
import { PostModule } from './app/post.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PostModule, postConfig);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}

bootstrap();
