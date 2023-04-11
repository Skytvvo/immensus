import {
  Body, ConflictException, Controller, Get, HttpCode, HttpStatus, OnModuleInit, Post, Req, Res,
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
    try {
      return this.iamService.signUp(signUpDto);
    } catch (err) {
      throw new ConflictException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    const {
      accessToken,
      refreshToken,
    } = await this.iamService.signIn(signInDto).toPromise();
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

  @HttpCode(HttpStatus.OK)
  @Get('refresh-tokens')
  async refreshTokens(
    @Res({ passthrough: true }) response: Response,
    @Req() req,
  ) {
    const { refreshToken: refreshingToken } = req.cookies;
    const {
      accessToken,
      refreshToken,
    } = await this.iamService.refreshTokens({ refreshingToken }).toPromise();

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
