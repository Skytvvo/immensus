import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateProfileDto, GetProfileDto } from '@immensus/data-access-services';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @GrpcMethod('ProfileService', 'CreateProfile')
  async createUser(data: CreateProfileDto) {
    return this.usersService.createProfile(data);
  }

  @GrpcMethod('ProfileService', 'GetProfile')
  async getProfile(dto: Partial<GetProfileDto>) {
    return this.usersService.getProfile(dto);
  }
}
