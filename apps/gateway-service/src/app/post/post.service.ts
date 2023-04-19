import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, ClientOptions } from '@nestjs/microservices';
import {
  IPostRpcService, POST_SERVICE_NAME, postConfig, CreatePostDto, jwtConfig, IActiveUserData,
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

  getData() {
    return this.postRpcService.getData({});
  }

  async createPost(createPostDto: Omit<CreatePostDto, 'authorId'>, cookies: Record<string, string>) {
    const { description } = createPostDto;
    const { refreshToken } = cookies;

    const { sub: authorId } = await this.jwtService.verifyAsync<Pick<IActiveUserData, 'sub'>>(refreshToken, {
      secret: this.jwtConfiguration.secret,
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
    });

    return this.postRpcService.createPost({
      authorId,
      description,
    });
  }
}
