import {
  Controller, Get,
} from '@nestjs/common';
import {
  AuthType,
} from '@immensus/data-access-services';
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
}
