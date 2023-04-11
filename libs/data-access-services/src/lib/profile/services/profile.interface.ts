import { Observable } from 'rxjs';
import { GetProfileDto } from "../dto";

export interface IProfileService{
  GetProfile(data: Partial<GetProfileDto>): Observable<any>;
  CreateProfile(data: any): Observable<undefined>;
}
