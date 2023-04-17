import { Observable } from 'rxjs';
import { CreateProfileDto, GetProfileDto } from "../dto";
import { User } from "../entities";

export interface IProfileService{
  GetProfile(data: Partial<GetProfileDto>): Observable<User>;
  CreateProfile(data: CreateProfileDto): Observable<undefined>;
}
