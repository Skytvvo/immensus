import {
  Body, Controller, HttpCode, HttpStatus, OnModuleInit, Post, Res,
} from '@nestjs/common';
import { Client, ClientGrpc, ClientOptions } from '@nestjs/microservices';
import {
  iamConfig, AuthType, SignInDto, SignUpDto,
} from '@immensus/data-access-services';
import { Response } from 'express';
import { IAuthService } from './interfaces/auth.interface';
import { Auth } from '../../decorators/auth.decorator';

@Auth(AuthType.NONE)
@Controller('auth')
export class AuthController implements OnModuleInit {
  @Client(iamConfig as ClientOptions)
  private client: ClientGrpc;

  private iamService: IAuthService;

  onModuleInit() {
    this.iamService = this.client.getService<IAuthService>('AuthenticationService');
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.iamService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    const { accessToken, refreshToken } = await this.iamService.signIn(signInDto).toPromise();
    response.cookie('accessToken', accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });

    response.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
  }
}
