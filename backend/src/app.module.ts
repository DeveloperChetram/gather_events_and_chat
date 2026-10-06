import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma/prisma.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users/users.service.js';
import { UsersModule } from './users/users.module.js';
import { AuthService } from './auth/auth.service.js';
import { AuthModule } from './auth/auth.module.js';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),PrismaModule, UsersModule, AuthModule,],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersService],
  
})
export class AppModule {}
