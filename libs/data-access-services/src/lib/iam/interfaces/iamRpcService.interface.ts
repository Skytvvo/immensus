import { Observable } from 'rxjs';
import { RefreshingTokenDto, SignInDto, SignUpDto } from "../dto";

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IIamRpcService{
  signUp(data: SignUpDto): Observable<undefined>;
  signIn(data: SignInDto): Observable<ITokens>;
  refreshTokens(data: RefreshingTokenDto): Observable<ITokens>;
}
