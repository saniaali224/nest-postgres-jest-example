import { MinLength, IsString, MaxLength } from "class-validator";

export class TAuthCredentials {
    @IsString()
    @MaxLength(17)
    @MinLength(5)
    
    username: string;

    @IsString()
    @MaxLength(10)
    @MinLength(5)
    password: string
}