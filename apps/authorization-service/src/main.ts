/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

const PORT = process.env.PORT_AUTHORIZATION_SERVICE || 4402;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'authentication',
      protoPath: join(__dirname, '../../../apps/authorization-service/src/authentication.proto'),
      url: `localhost:${PORT}`,
      loader: { keepCase: true, arrays: true, objects: true },
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}

bootstrap();
