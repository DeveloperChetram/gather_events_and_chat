import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './guards/auth.guard.js';
import { APP_GUARD } from '@nestjs/core';


@Module({

    imports: [
        
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],


            useFactory: (configService: ConfigService) => ({
                global: true,

                secret: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),

                signOptions: {
                    expiresIn: '5m',
                },
            }),
        })
    ],
    providers: [
        AuthService,
        AuthGuard,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    controllers: [AuthController],
    exports: [ AuthGuard]

})
export class AuthModule { }

