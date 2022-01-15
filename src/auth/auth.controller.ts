import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login.dto';
import { UserRegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() userRegisterDto: UserRegisterDto) {
        try {
            return await this.authService.registerUser(userRegisterDto);
        } catch (e) {
            throw new BadRequestException(e.message);
        } 
    }

    @Post('login')
    async login(@Body() userLoginDto: UserLoginDto) {
        try {
            return await this.authService.authenticateUser(userLoginDto);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
    
}
