import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetPostsDto {
  @IsOptional()
  @IsString()
  cursor?: string;

  @IsNumber()
  pageSize: number;
}
