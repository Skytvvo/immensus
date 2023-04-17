import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RefreshingTokenDto, SignInDto, SignUpDto } from '@immensus/data-access-services';
import { IamService } from './iam.service';

@Controller()
export class IamController {
  constructor(private readonly authService: IamService) {}

  @GrpcMethod('IamService', 'SignUp')
  signUp(signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @GrpcMethod('IamService', 'SignIn')
  async signIn(signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @GrpcMethod('IamService', 'RefreshTokens')
  async refreshTokens(refreshingToken: RefreshingTokenDto) {
    return this.authService.refreshTokens(refreshingToken);
  }
}
