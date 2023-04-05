import { Observable } from 'rxjs';

export interface IProfileService{
  getData(): Observable<any>;
}
