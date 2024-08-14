import { BadRequestException, Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { baseResponse } from 'src/dtos/baseResponse';
import { Authenticate, DtoAuth } from 'src/dtos/users.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService) { }

    async authenticate(user: DtoAuth): Promise<Authenticate> {
        const authenticateUser = await this.prismaService.users.findFirst({
            where: {
                usuario: user.usuario,
                password: user.password,
            },
            include: {
                users_roles: true
            }
        });

        const responseAuth: Authenticate =  {
            userAuthenticate: {} as users,
            ...baseResponse
        };

        if (!authenticateUser) {
            responseAuth.message = 'Usuario o contraseña incorrectos';
            responseAuth.statusCode = 400;
            responseAuth.success = false;
            return responseAuth;
        }

        if (authenticateUser.users_status == false) {
            responseAuth.message = 'Usuario Inactivo';
            responseAuth.statusCode = 400;
            responseAuth.success = false;
            return responseAuth;
        }

        responseAuth.message = `Bienvenido ${authenticateUser.nombre}`;
        responseAuth.userAuthenticate = authenticateUser;

        return responseAuth;
    }
}
