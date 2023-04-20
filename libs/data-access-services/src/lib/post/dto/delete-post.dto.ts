import { IsUUID } from "class-validator";

export class DeletePostDto {
  @IsUUID()
  id: string;
}
