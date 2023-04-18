import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, ClientOptions } from '@nestjs/microservices';
import {
  IPostRpcService, POST_SERVICE_NAME, postConfig,
} from '@immensus/data-access-services';

@Injectable()
export class PostService implements OnModuleInit {
  @Client(postConfig as ClientOptions)
  private client: ClientGrpc;

  private postRpcService: IPostRpcService;

  onModuleInit() {
    this.postRpcService = this.client.getService<IPostRpcService>(POST_SERVICE_NAME);
  }

  getData() {
    return this.postRpcService.getData({});
  }
}
