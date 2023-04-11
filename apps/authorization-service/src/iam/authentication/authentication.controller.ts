import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RefreshingTokenDto, SignInDto, SignUpDto } from '@immensus/data-access-services';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {
  }

  @GrpcMethod('AuthenticationService', 'SignUp')
  signUp(signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @GrpcMethod('AuthenticationService', 'SignIn')
  async signIn(signInDto: SignInDto) {
    // return this.authService.signIn(signInDto);
  }

  @GrpcMethod('AuthenticationService', 'RefreshTokens')
  async refreshTokens(refreshingToken: RefreshingTokenDto) {
    // return this.authService.refreshTokens(refreshingToken);
  }
}
