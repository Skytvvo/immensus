import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, ClientOptions } from '@nestjs/microservices';
import {
  IPostRpcService, POST_SERVICE_NAME, postConfig, CreatePostDto, jwtConfig, IActiveUserData, GetPostDto,
} from '@immensus/data-access-services';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class PostService implements OnModuleInit {
  @Client(postConfig as ClientOptions)
  private client: ClientGrpc;

  private postRpcService: IPostRpcService;

  onModuleInit() {
    this.postRpcService = this.client.getService<IPostRpcService>(POST_SERVICE_NAME);
  }

  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
  }

  async createPost(createPostDto: Omit<CreatePostDto, 'authorId'>, cookies: Record<string, string>) {
    const { description } = createPostDto;
    const { refreshToken } = cookies;

    const { sub: authorId } = await this.jwtService.verifyAsync<Pick<IActiveUserData, 'sub'>>(refreshToken, {
      secret: this.jwtConfiguration.secret,
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
    });

    return this.postRpcService.CreatePost({
      authorId,
      description,
    });
  }

  async getPost(getPostDto: GetPostDto) {
    console.log(getPostDto)
    return this.postRpcService.GetPost(getPostDto);
  }
}