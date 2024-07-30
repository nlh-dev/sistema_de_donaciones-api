import { BadRequestException, Injectable } from '@nestjs/common';
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
                password: user.password
            }
        });

        if (!authenticateUser) {
            throw new BadRequestException('Usuario no encontrado.')
        }

        baseResponse.message = `Bienvenido ${authenticateUser.nombre}`

        const responseAuth: Authenticate = {
            userAuthenticate: authenticateUser,
            ...baseResponse
        }

        return responseAuth;
    }
}
