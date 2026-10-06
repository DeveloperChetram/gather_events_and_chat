import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { AuthModule } from '../auth/auth.module.js';
import { AuthGuard } from '../auth/guards/auth.guard.js';

@Module({



    imports:[],
    providers:[UsersService, ],
    exports:[UsersModule],
    controllers: [UsersController]
  
})
export class UsersModule {

    

}
