import {
  Body, Controller, OnModuleInit, Post,
} from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { authConfig } from '@immensus/data-access-services';
import { IAuthService } from './interfaces/auth.interface';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController implements OnModuleInit {
  @Client(authConfig)
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
