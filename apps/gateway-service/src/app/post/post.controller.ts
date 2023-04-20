import {
  Body,
  Controller, Get, Param, Post, Query, Req,
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

  @Post()
  createPost(@Req() req: Request, @Body() createPostDto: Omit<CreatePostDto, 'authorId'>) {
    return this.postService.createPost(createPostDto, req.cookies);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postService.getPost({ id });
  }

  @Get()
  async getPosts(
    @Query('pageSize') pageSize: number,
    @Query('cursor') cursor?: string,
  ) {
    return this.postService.getPosts({ cursor, pageSize });
  }
}
