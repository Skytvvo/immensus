import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateProfileDto,
  GetProfileDto,
  PROFILE_SERVICE_NAME,
} from '@immensus/data-access-services';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @GrpcMethod(PROFILE_SERVICE_NAME, 'CreateProfile')
  async createUser(data: CreateProfileDto) {
    return this.usersService.createProfile(data);
  }

  @GrpcMethod(PROFILE_SERVICE_NAME, 'GetProfile')
  async getProfile(dto: Partial<GetProfileDto>) {
    return this.usersService.getProfile(dto);
  }
}
