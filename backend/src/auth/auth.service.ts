import { ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { registerUserDto } from './dto/register-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt'
import { throwError } from 'rxjs';
    
import { loginUserDto } from './dto/login-user.dto.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
// import { emit } from 'process';

@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService, private readonly configService: ConfigService) { }
    async registerUser(dto: registerUserDto) {
        try {
            // throw new Error('test error')
            const user = await this.prisma.user.findFirst({
                where: {
                    email: dto.email
                }
            })

            if (user) throw new ConflictException('user with this email is already registered')

            const hashedPassword = await bcrypt.hash(dto.password, 10)
            const newUser = await this.prisma.user.create({
                data: {
                    fullName: dto.fullName,
                    email: dto.email,
                    password: hashedPassword
                },
                omit: {
                    password: true
                }
            })

            return { 'message': 'user registered successfully', newUser }
        } catch (error) {
            console.log(error);

            if (error instanceof HttpException) {
                throw error;
            }

            throw new InternalServerErrorException((error as Error).message ||
                'Something went wrong while registering user'
            );
        }

    }

    async loginUser(dto: loginUserDto, res: Response) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    email: dto.email
                },
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    password: true
                    
                }
            })

            if (!user) throw new NotFoundException('Invalid Creadentials')

            const isPasswordValid = await bcrypt.compare(dto.password, user.password)

            if (!isPasswordValid) throw new ConflictException('invalid password')

            const payload = { id: user.id, email: user.email, fullName: user.fullName }
            const accessToken = await this.jwtService.signAsync(payload, {
                expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRES_IN'),
            })

            // console.log(accessToken);

            const { password, ...userWithoutPassword } = user;


            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000, // 15 minutes
            });

            return res.json({
            message: 'Login successful',
            })
    } catch (error) {
            console.log(error);

            if (error instanceof HttpException) {
                throw error;
            }

            throw new InternalServerErrorException((error as Error).message ||
                'Something went wrong while logging in user'
            );
        }

    }



}
