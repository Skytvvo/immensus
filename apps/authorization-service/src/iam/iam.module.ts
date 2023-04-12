import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '@immensus/data-access-services';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { IamController } from './iam.controller';
import { IamService } from './iam.service';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [IamController],
  providers: [{
    provide: HashingService,
    useClass: BcryptService,
  },
  IamService,
  ],
})
export class IamModule {}
