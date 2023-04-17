import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateProfileDto {
  @IsString()
  fullName: string;

  @IsString()
  nickname: string;

  @IsEmail()
  email: string;

  @MinLength(12)
  password: string;
}
