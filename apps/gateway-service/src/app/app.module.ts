import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ProfileController } from './profile/profile.controller';

@Module({
  imports: [],
  controllers: [AuthController, ProfileController],
  providers: [],
})
export class AppModule {}
