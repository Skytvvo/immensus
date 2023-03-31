import { RoleEnum } from '../../users/enums/role.enum';

export interface ActiveUserData{
  sub: number;
  email: string;
  role: RoleEnum
}
