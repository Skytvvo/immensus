import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto, GetProfileDto, User } from '@immensus/data-access-services';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async createProfile({
    email, password, fullName, nickname,
  }: CreateProfileDto) {
    try {
      const user = new User();
      user.email = email;
      user.password = password;
      user.fullName = fullName;
      user.nickname = nickname;

      await this.usersRepository.save(user);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  async getProfile(dto: Partial<GetProfileDto>) {
    try {
      return this.usersRepository.findOneByOrFail(dto);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }
}
