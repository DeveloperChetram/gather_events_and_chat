import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { registerUserDto } from './dto/register-user.dto.js';
import { loginUserDto } from './dto/login-user.dto.js';
import type { Response } from 'express';
import { Public } from './decorators/public.decorator.js';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('register')
    @Public()
    regsterUser(@Body() dto:registerUserDto){
        return this.authService.registerUser(dto)
}
    @Public()
    @Post('login')
    loginUser(@Body() dto:loginUserDto, @Res() res: Response){
        return this.authService.loginUser(dto, res)
    }


}
