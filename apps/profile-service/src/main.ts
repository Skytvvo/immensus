/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app/app.module';

const PORT = process.env.PORT_PROFILE_SERVICE || 4402;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'profile',
      protoPath: join(__dirname, '../../../apps/profile-service/src/profile.proto'),
      url: `localhost:${PORT}`,
      loader: { keepCase: true, arrays: true, objects: true },
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}

bootstrap();
