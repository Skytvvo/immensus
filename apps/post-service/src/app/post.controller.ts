import { Controller } from '@nestjs/common';

import { GrpcMethod } from '@nestjs/microservices';
import { CreatePostDto, GetPostDto, POST_SERVICE_NAME } from '@immensus/data-access-services';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private readonly appService: PostService) {}

  @GrpcMethod(POST_SERVICE_NAME, 'CreatePost')
  createPost(createPostDto: CreatePostDto) {
    return this.appService.createPost(createPostDto);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'GetPost')
  getPost(getPostDto: GetPostDto) {
    return this.appService.getPost(getPostDto);
  }
}
