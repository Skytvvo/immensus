import { IsEmail, IsNumber, IsString } from "class-validator";

export class GetProfileDto {
  @IsEmail()
  email: string;

  @IsNumber()
  id: number;

  @IsString()
  fullName: string;

  @IsString()
  nickname: string;
}
