import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class UserDto{

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    lastname:string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    confirmPassword:string;

    @IsNotEmpty()
    birthday:string;

    @IsNotEmpty()
    phone:string;


}
