import {
  ConflictException,
  Inject, Injectable, UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData, User } from '@immensus/data-access-services';
import { HashingService } from '../hashing/hashing.service';
import { SignInDto } from '../../../../../libs/data-access-services/src/lib/iam/dto/sign-in.dto';
import { SignUpDto } from '../../../../../libs/data-access-services/src/lib/iam/dto/sign-up.dto';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class AuthenticationService {
  constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly hashingService: HashingService,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const user = new User();
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);
      await this.usersRepository.save(user);
    } catch (err) {
      throw new ConflictException();
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersRepository.findOneBy({ email: signInDto.email });
    if (!user) throw new UnauthorizedException('User does not exist');
    const isEqual = this.hashingService.compare(signInDto.password, user.password);
    if (!isEqual) throw new UnauthorizedException('Password does not match');
    return this.generateTokens(user);
  }

  private async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email, role: user.role },
      ),
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.refreshTokenTtl,
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private signToken<T>(userId: number, expiresIn: number, payload?:T) {
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
    refreshingToken: string,
  ) {
    try {
      const { sub } = await this.jwtService.verifyAsync<Pick<ActiveUserData, 'sub'>>(refreshingToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.usersRepository.findOneByOrFail({
        id: sub,
      });

      return this.generateTokens(user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
