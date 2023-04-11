import { IsEmail, MinLength } from "class-validator";

export class CreateProfileDto {
  @IsEmail()
  email: string;

  @MinLength(12)
  password: string;
}
