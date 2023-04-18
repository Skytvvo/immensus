import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '@immensus/data-access-services';
import { ProfileController } from './profile/profile.controller';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { RolesGuard } from '../guards/roles.guard';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { IamController } from './iam/iam.controller';
import { IIamService } from './iam/iam.service';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [IamController, ProfileController, PostController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AccessTokenGuard,
    IIamService,
    PostService,
  ],
})
export class AppModule {}
