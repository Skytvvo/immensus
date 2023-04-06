import {
  Controller, Get, HttpCode, HttpStatus, Req, Res,
} from '@nestjs/common';
import { Response } from 'express';
import { GrpcMethod } from '@nestjs/microservices';
import { SignInDto, SignUpDto } from '@immensus/data-access-services';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {
  }

  @GrpcMethod('AuthenticationService', 'SignUp')
  signUp(signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @GrpcMethod('AuthenticationService', 'signIn')
  async signIn(signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
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
    } = await this.authService.refreshTokens(refreshingToken);

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
