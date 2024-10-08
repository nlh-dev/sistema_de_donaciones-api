import { BadRequestException, Injectable } from '@nestjs/common';
import { users, users_roles } from '@prisma/client';
import { DtoBaseResponse } from 'src/dtos/base-response.dto';
import { baseBadResponse, baseResponse } from 'src/dtos/baseResponse';
import { DtoChangeStatusUsers, DtoCreateUsers, DtoUpdateUsers } from 'src/dtos/users.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {

    constructor(private prismaService: PrismaService) { }

    async getUsers(): Promise<users[]> {
        return await this.prismaService.users.findMany({
            include: {
                users_roles: true
            }
        });
    }

    async getRoles(): Promise<users_roles[]> {
        return await this.prismaService.users_roles.findMany();
    }

    async addUsers(user: DtoCreateUsers): Promise<DtoBaseResponse> {
        const createUsers = await this.prismaService.users.create({
            data: {
                nombre: user.nombre,
                apellido: user.apellido,
                password: user.password,
                usuario: user.usuario,
                users_role_id: user.usersRoleId,
                users_status: true
            }
        });

        if (!createUsers) {
            baseBadResponse.message = 'Ha ocurrido un error al crear el usuario';
            return baseBadResponse;
        }
        baseResponse.message = 'Usuario registrado.';
        return baseResponse;
    }

    async changeStatusUser(user: DtoChangeStatusUsers): Promise<DtoBaseResponse> {
        const putUsers = await this.prismaService.users.update({
            data: {
                users_status: user.active
            },
            where: {
                users_ID: user.idUsers
            }
        });

        if (!putUsers) {
            baseBadResponse.message = 'Ha ocurrido un error al actualizar el usuario';
            return baseBadResponse;
        }

        baseResponse.message = 'Estatus actualizado.';
        return baseResponse;
    }

    async updateUsers(user: DtoUpdateUsers): Promise<DtoBaseResponse> {
        const putUsers = await this.prismaService.users.update({
            data: {
                nombre: user.nombre,
                apellido: user.apellido,
                password: user.password,
                usuario: user.usuario,
                users_role_id: user.usersRoleId,
                users_status: user.active
            },
            where: {
                users_ID: user.idUsers
            }
        });

        if (!putUsers) {
            baseBadResponse.message = 'Ha ocurrido un error al actualizar el usuario';
            return baseBadResponse;
        }

        baseResponse.message = 'Usuario actualizado.';
        return baseResponse;
    }

    async deleteUsers(idUser: string): Promise<DtoBaseResponse> {
        const deleteUsers = await this.prismaService.users.delete({
            where: {
                users_ID: Number(idUser)
            }
        });

        if (!deleteUsers) {
            baseBadResponse.message = 'Ha ocurrido un error al eliminar el usuario';
            return baseBadResponse;
        }

        baseResponse.message = 'Usuario eliminado.';
        return baseResponse;
    }
}
