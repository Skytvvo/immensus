import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import {
  CreatePostDto, IProfileService, Post, PROFILE_SERVICE_NAME, profileConfig,
} from '@immensus/data-access-services';
import { Client, ClientGrpc, ClientOptions } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService implements OnModuleInit {
  @Client(profileConfig as ClientOptions)
  private profileClient: ClientGrpc;

  private profileService: IProfileService;

  onModuleInit() {
    this.profileService = this.profileClient.getService(PROFILE_SERVICE_NAME);
  }

  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async createPost(createPostDto: CreatePostDto) {
    const { authorId, description } = createPostDto;

    const author = await this.profileService.GetProfile({ id: authorId }).toPromise();
    if (!author) {
      throw new NotFoundException();
    }
    const post = new Post(author, description);

    await this.postRepository.save(post);
  }
}
