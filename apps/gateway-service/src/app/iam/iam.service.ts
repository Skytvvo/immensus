import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, ClientOptions } from '@nestjs/microservices';
import { iamConfig, SignInDto, SignUpDto } from '@immensus/data-access-services';
import { Response, Request } from 'express';
import { IAuthService } from './interfaces/iam.interface';

@Injectable()
export class IamService implements OnModuleInit {
  @Client(iamConfig as ClientOptions)
  private client: ClientGrpc;

  private iamRpcService: IAuthService;

  onModuleInit() {
    this.iamRpcService = this.client.getService<IAuthService>('AuthenticationService');
  }

  signUp(signUpDto: SignUpDto) {
    try {
      return this.iamRpcService.signUp(signUpDto);
    } catch (err) {
      throw new ConflictException();
    }
  }

  async signIn(signInDto: SignInDto, response: Response) {
    const {
      accessToken,
      refreshToken,
    } = await this.iamRpcService.signIn(signInDto).toPromise();
    this.applyToken(accessToken, refreshToken, response);
  }

  async refreshTokens(req: Request, response: Response) {
    const { refreshToken: refreshingToken } = req.cookies;
    const {
      accessToken,
      refreshToken,
    } = await this.iamRpcService.refreshTokens({ refreshingToken }).toPromise();

    this.applyToken(accessToken, refreshToken, response);
  }

  private applyToken(accessToken: string, refreshToken: string, response: Response) {
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
