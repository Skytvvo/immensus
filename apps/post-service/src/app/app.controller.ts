import { Controller } from '@nestjs/common';

import { GrpcMethod } from '@nestjs/microservices';
import { POST_SERVICE_NAME } from '@immensus/data-access-services';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(POST_SERVICE_NAME, 'GetData')
  getData() {
    return this.appService.getData();
  }
}
