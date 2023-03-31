import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { User } from '../users/entities/user.entity';
import jwtConfig from './config/jwt.config';
import { AuthenticationGuard } from './authentication/guards/authentication/authentication.guard';
import { AccessTokenGuard } from './authentication/guards/access-token/access-token.guard';
import { RolesGuard } from './authorization/guards/roles/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthenticationController],
  providers: [{
    provide: HashingService,
    useClass: BcryptService,
  },
  {
    provide: APP_GUARD,
    useClass: AuthenticationGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  AccessTokenGuard,
  AuthenticationService,
  ],
})
export class IamModule {}
