import {
  Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res,
} from '@nestjs/common';
import {
  AuthType, CreateProfileDto, SignInDto,
} from '@immensus/data-access-services';
import { Response } from 'express';
import { Auth } from '../../decorators/auth.decorator';
import { IIamService } from './iam.service';

@Auth(AuthType.NONE)
@Controller('auth')
export class IamController {
  constructor(private readonly iamService: IIamService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: CreateProfileDto) {
    return this.iamService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() signInDto: SignInDto,
  ) {
    return this.iamService.signIn(signInDto, res);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh-tokens')
  async refreshTokens(
    @Res({ passthrough: true }) res: Response,
    @Req() req,
  ) {
    return this.iamService.refreshTokens(req, res);
  }
}
