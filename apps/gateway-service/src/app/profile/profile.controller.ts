import { Controller, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, ClientOptions } from '@nestjs/microservices';
import { profileConfig } from '@immensus/data-access-services';
import { IProfileService } from './interfaces/profile.interface';

@Controller('profile')
export class ProfileController implements OnModuleInit {
  @Client(profileConfig as ClientOptions)
  private client: ClientGrpc;

  private profileService: IProfileService;

  onModuleInit() {
    this.profileService = this.client.getService<IProfileService>('ProfileService');
  }
}
