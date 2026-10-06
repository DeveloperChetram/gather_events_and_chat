import { IsNotEmpty, IsString } from "class-validator";

export class registerUserDto {
     @IsString()
    @IsNotEmpty()
    fullName:string;
     @IsString()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string
}

