import { Observable } from 'rxjs';

interface ISignUp{
  email: string;
  password: string;
}

export interface IAuthService{
  signUp(data: ISignUp): Observable<any>;
}
