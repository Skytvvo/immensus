import { RoleEnum } from "../iam.enum";

export interface IActiveUserData{
  sub: string;
  email: string;
  role: RoleEnum
}
