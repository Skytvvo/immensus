import { Observable } from 'rxjs';
import { GetProfileDto } from '@immensus/data-access-services';

export interface IProfileService{
  GetProfile(data: Partial<GetProfileDto>): Observable<any>;
  CreateProfile(data: any): Observable<undefined>;
}
