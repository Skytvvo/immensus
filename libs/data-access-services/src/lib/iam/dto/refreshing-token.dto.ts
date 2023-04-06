import { IsString, } from "class-validator";

export class RefreshingTokenDto {
    @IsString()
    refreshingToken: string;
}
