import { RoleEnum } from "../iam.enum";

export interface IActiveUserData{
  sub: number;
  email: string;
  role: RoleEnum
}
