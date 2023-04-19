import {
  Inject, Injectable, OnModuleInit, UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import {
  CreateProfileDto,
  IActiveUserData,
  IProfileService,
  jwtConfig, PROFILE_SERVICE_NAME, profileConfig, RefreshingTokenDto, SignInDto, User,
} from '@immensus/data-access-services';
import {
  Client, ClientGrpc, ClientOptions, RpcException,
} from '@nestjs/microservices';
import { HashingService } from './hashing/hashing.service';

@Injectable()
export class IamService implements OnModuleInit {
  constructor(
        private readonly hashingService: HashingService,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  @Client(profileConfig as ClientOptions)
  private client: ClientGrpc;

  private profileService: IProfileService;

  onModuleInit() {
    this.profileService = this.client.getService<IProfileService>(PROFILE_SERVICE_NAME);
  }

  async signUp(signUpDto: CreateProfileDto) {
    let existingUser = null;
    try {
      existingUser = await this.profileService.GetProfile({ email: signUpDto.email })?.toPromise();
    } catch (err) {
      if (err instanceof RpcException) {
        throw new UnauthorizedException(err.message);
      }
    }

    if (existingUser) throw new RpcException('User already exist');

    try {
      const password = await this.hashingService.hash(signUpDto.password);
      return this.profileService.CreateProfile({
        ...signUpDto,
        password,
      });
    } catch (err) {
      throw new RpcException('Can\'t create the user');
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.profileService.GetProfile({ email: signInDto.email }).toPromise();
    if (!user) throw new UnauthorizedException('User does not exist');

    const isEqual = this.hashingService.compare(signInDto.password, user.password);
    if (!isEqual) throw new UnauthorizedException('Password does not match');
    return this.generateTokens(user);
  }

  private async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<IActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email, role: user.role },
      ),
      this.signToken<Partial<IActiveUserData>>(
        user.id,
        this.jwtConfiguration.refreshTokenTtl,
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private signToken<T>(userId: string, expiresIn: number, payload?:T) {
    return this.jwtService.signAsync({
      sub: userId,
      ...payload,
    }, {
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
      secret: this.jwtConfiguration.secret,
      expiresIn: this.jwtConfiguration.accessTokenTtl,
    });
  }

  async refreshTokens(
    { refreshingToken }: RefreshingTokenDto,
  ) {
    try {
      const { sub } = await this.jwtService.verifyAsync<Pick<IActiveUserData, 'sub'>>(refreshingToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.profileService.GetProfile({ id: sub }).toPromise();
      return this.generateTokens(user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
