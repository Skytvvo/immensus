import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, ClientOptions } from '@nestjs/microservices';
import {
  CreateProfileDto,
  iamConfig, IIamRpcService, SignInDto,
} from '@immensus/data-access-services';
import { Response, Request } from 'express';

@Injectable()
export class IIamService implements OnModuleInit {
  @Client(iamConfig as ClientOptions)
  private client: ClientGrpc;

  private iamRpcService: IIamRpcService;

  onModuleInit() {
    this.iamRpcService = this.client.getService<IIamRpcService>('IamService');
  }

  signUp(signUpDto: CreateProfileDto) {
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
