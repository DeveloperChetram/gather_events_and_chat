import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard.js';

@Controller('users')
export class UsersController {


    @Get()
    // @UseGuards(AuthGuard)
    getUsers(){
        return {message: 'get users'}
    }
}
