import { Observable } from 'rxjs';
import { SignInDto, SignUpDto, RefreshingTokenDto } from '@immensus/data-access-services';

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthService{
  signUp(data: SignUpDto): Observable<undefined>;
  signIn(data: SignInDto): Observable<ITokens>;
  refreshTokens(data: RefreshingTokenDto): Observable<ITokens>;
}
