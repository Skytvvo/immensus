import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateProfileDto, IAM_SERVICE_NAME, RefreshingTokenDto, SignInDto,
} from '@immensus/data-access-services';
import { IamService } from './iam.service';

@Controller()
export class IamController {
  constructor(private readonly authService: IamService) {}

  @GrpcMethod(IAM_SERVICE_NAME, 'SignUp')
  signUp(signUpDto: CreateProfileDto) {
    return this.authService.signUp(signUpDto);
  }

  @GrpcMethod(IAM_SERVICE_NAME, 'SignIn')
  async signIn(signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @GrpcMethod(IAM_SERVICE_NAME, 'RefreshTokens')
  async refreshTokens(refreshingToken: RefreshingTokenDto) {
    return this.authService.refreshTokens(refreshingToken);
  }
}
