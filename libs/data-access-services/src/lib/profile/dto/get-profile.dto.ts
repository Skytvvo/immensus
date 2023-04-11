import { IsEmail, IsNumber } from "class-validator";

export class GetProfileDto {
  @IsEmail()
  email: string;

  @IsNumber()
  id: number;
}
