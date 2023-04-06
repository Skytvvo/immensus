import { Observable } from 'rxjs';
import { SignInDto, SignUpDto } from '@immensus/data-access-services';

interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthService{
  signUp(data: SignUpDto): Observable<any>;
  signIn(data: SignInDto): Observable<ISignInResponse>;
}
