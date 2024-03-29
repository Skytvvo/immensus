import { Controller } from '@nestjs/common';

import { GrpcMethod } from '@nestjs/microservices';
import {
  CreatePostDto, DeletePostDto, GetPostDto, GetPostsDto, PatchPostDto, POST_SERVICE_NAME,
} from '@immensus/data-access-services';
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

  @GrpcMethod(POST_SERVICE_NAME, 'GetPosts')
  getPosts(getPostsDto: GetPostsDto) {
    return this.appService.getPosts(getPostsDto);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'PatchPost')
  patchPost(patchPostDto: PatchPostDto) {
    return this.appService.patchPost(patchPostDto);
  }

  @GrpcMethod(POST_SERVICE_NAME, 'DeletePost')
  deletePost(deletePostDto: DeletePostDto) {
    return this.appService.deletePost(deletePostDto);
  }
}
