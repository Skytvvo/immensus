import { IsUUID, IsString } from "class-validator";

export class CreatePostDto {
  @IsUUID()
  authorId: string;
  @IsString()
  description: string;
}
