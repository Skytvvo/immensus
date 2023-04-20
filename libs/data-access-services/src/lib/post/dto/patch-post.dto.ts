import { IsString, IsUUID } from "class-validator";

export class PatchPostDto {
  @IsUUID()
  id: string;
  @IsString()
  description: string;
}
