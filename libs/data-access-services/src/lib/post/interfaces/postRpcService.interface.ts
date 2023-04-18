import { Observable } from 'rxjs';

export interface IPostRpcService{
  getData(data: unknown): Observable<undefined>;
}
