import {
  Controller, Get, OnModuleInit, Query,
} from '@nestjs/common';
import {
  Client, ClientGrpc, ClientOptions,
} from '@nestjs/microservices';
import {
  AuthType, GetProfileDto, profileConfig, IProfileService, PROFILE_SERVICE_NAME,
} from '@immensus/data-access-services';
import { Auth } from '../../decorators/auth.decorator';

@Auth(AuthType.NONE)
@Controller('profile')
export class ProfileController implements OnModuleInit {
  @Client(profileConfig as ClientOptions)
  private client: ClientGrpc;

  private profileService: IProfileService;

  onModuleInit() {
    this.profileService = this.client.getService<IProfileService>(PROFILE_SERVICE_NAME);
  }

  @Get()
  async getProfile(
    @Query() dto: GetProfileDto,
  ) {
    return this.profileService.GetProfile(dto);
  }
}
