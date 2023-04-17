import { Observable } from 'rxjs';
import { RefreshingTokenDto, SignInDto } from "../dto";
import { CreateProfileDto } from "../../profile";

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IIamRpcService{
  signUp(data: CreateProfileDto): Observable<undefined>;
  signIn(data: SignInDto): Observable<ITokens>;
  refreshTokens(data: RefreshingTokenDto): Observable<ITokens>;
}
