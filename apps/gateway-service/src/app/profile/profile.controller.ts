import {
  Controller, Get, NotFoundException, OnModuleInit, Query,
} from '@nestjs/common';
import {
  Client, ClientGrpc, ClientOptions,
} from '@nestjs/microservices';
import { AuthType, GetProfileDto, profileConfig } from '@immensus/data-access-services';
import { IProfileService } from './interfaces/profile.interface';
import { Auth } from '../../decorators/auth.decorator';
import { GetProfilePipe } from './pipes/get-profile.pipe';

@Auth(AuthType.NONE)
@Controller('profile')
export class ProfileController implements OnModuleInit {
  @Client(profileConfig as ClientOptions)
  private client: ClientGrpc;

  private profileService: IProfileService;

  onModuleInit() {
    this.profileService = this.client.getService<IProfileService>('ProfileService');
  }

  @Get()
  async getProfile(
    @Query(new GetProfilePipe()) dto: GetProfileDto,
  ) {
    try {
      return this.profileService.GetProfile(dto);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
