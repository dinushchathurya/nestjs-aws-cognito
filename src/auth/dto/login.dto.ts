import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
    @IsEmail()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;
}