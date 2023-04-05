import {
  Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res,
} from '@nestjs/common';
import { Response } from 'express';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

@Auth(AuthType.NONE)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {
  }

  @GrpcMethod('AuthenticationService', 'SignUp')
  signUp(signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
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
    } = await this.authService.signIn(signInDto);

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
