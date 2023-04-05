import { Observable } from 'rxjs';

export interface IProfileService{
  getData(data: Record<string, never>): Observable<any>;
}
