import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SignInDto, SignUpDto } from '@immensus/data-access-services';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {
  }

  @GrpcMethod('AuthenticationService', 'signUp')
  signUp(signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @GrpcMethod('AuthenticationService', 'signIn')
  async signIn(signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @GrpcMethod('AuthenticationService', 'refreshTokens')
  async refreshTokens(refreshingToken: string) {
    return this.authService.refreshTokens(refreshingToken);
  }
}
