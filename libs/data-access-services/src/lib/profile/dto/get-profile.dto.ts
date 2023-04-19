import { IsEmail, IsString, IsUUID } from "class-validator";

export class GetProfileDto {
  @IsEmail()
  email: string;

  @IsUUID()
  id: string;

  @IsString()
  fullName: string;

  @IsString()
  nickname: string;
}
