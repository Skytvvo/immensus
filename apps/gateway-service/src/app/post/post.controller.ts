import {
  Body,
  Controller, Get, Post, Req,
} from '@nestjs/common';
import {
  AuthType, CreatePostDto,
} from '@immensus/data-access-services';
import { Request } from 'express';
import { Auth } from '../../decorators/auth.decorator';
import { PostService } from './post.service';

@Auth(AuthType.NONE)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getData() {
    return this.postService.getData();
  }

  @Post()
  createPost(@Req() req: Request, @Body() createPostDto: Omit<CreatePostDto, 'authorId'>) {
    return this.postService.createPost(createPostDto, req.cookies);
  }
}
