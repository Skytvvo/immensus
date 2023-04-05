import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { IProfileService } from './interfaces/profile.interface';

@Controller('profile')
export class ProfileController implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'profile',
      protoPath: join(__dirname, '../../../apps/profile-service/src/profile.proto'),
      url: 'localhost:4402',
    },
  })
  private client: ClientGrpc;

  private profileService: IProfileService;

  onModuleInit() {
    this.profileService = this.client.getService<IProfileService>('ProfileService');
  }

  @Get()
  async getAll() {
    return this.profileService.getData({});
  }
}
