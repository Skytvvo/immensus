import {
  Body, Controller, OnModuleInit, Post,
} from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { IAuthService } from './interfaces/auth.interface';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'authentication',
      protoPath: join(__dirname, '../../../apps/authorization-service/src/authentication.proto'),
      url: 'localhost:4400',
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
