import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service.js';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector, private readonly prismaService:PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookie = request.cookies['accessToken'] // Assuming the token is stored in a cookie named 'accessToken'
console.log('AuthGuard: Checking access token in cookies:', cookie);

const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true; // Allow access to public routes
    }
  

    if (!cookie) {
      throw new UnauthorizedException('Access denied! no token provided.');
    }
    

    try{

         const decoded  =  await this.jwtService.verify(cookie)

         const user = this.prismaService.user.findUnique({
        where:{
            id: (decoded as any).id
        },
        select:{
            id:true,
            email:true,
            fullName:true
        }
      })

      if(!user) {
        throw new UnauthorizedException('Access denied! user not found.');
      }

      request['user'] = user; 

    }catch (error) {

        console.log('AuthGuard: Error verifying token:', error);
        throw new UnauthorizedException('Access denied! invalid token.');

    }
   
    

      // Attach the user object to the request for further use in controllers
    return true;
  }
}


    