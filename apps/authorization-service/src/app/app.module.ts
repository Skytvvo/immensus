import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { IamModule } from '../iam/iam.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GATEWAY',
        transport: Transport.TCP,
      },
    ]),
    ConfigModule.forRoot(),
    UsersModule,
    IamModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
