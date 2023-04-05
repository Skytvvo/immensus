import {
  Body, Controller, OnModuleInit, Post,
} from '@nestjs/common';

import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SignUpDto } from './dto/sign-up.dto';
import { IAuthService } from './interfaces/authorization.interface';

@Controller()
export class AppController implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'authentication',
      protoPath: join(__dirname, '../../../apps/gateway-service/src/authentication.proto'),
    },
  })
  private client: ClientGrpc;

  private grpcService: IAuthService;

  onModuleInit() {
    this.grpcService = this.client.getService<IAuthService>('AuthenticationService');
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.grpcService.signUp(signUpDto);
  }
}
