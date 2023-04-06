import { RoleEnum } from "./iam.enum";

export interface ActiveUserData{
  sub: number;
  email: string;
  role: RoleEnum
}
