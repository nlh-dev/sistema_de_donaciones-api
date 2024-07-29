import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { users, users_roles } from '@prisma/client';
import { DtoBaseResponse } from 'src/dtos/base-response.dto';
import { DtoCreateUsers, DtoUpdateUsers } from 'src/dtos/users.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    async getUsers(): Promise<users[]>{
        return await this.usersService.getUsers();
    }
    @Get('/roles')
    async getRoles(): Promise<users_roles[]>{
        return await this.usersService.getRoles();
    }

    @Post()
    async createUser(@Body() user: DtoCreateUsers): Promise<DtoBaseResponse>{
        return await this.usersService.addUsers(user);
    }

    @Put()
    async updateUser(@Body() user: DtoUpdateUsers): Promise<DtoBaseResponse>{
        return await this.usersService.updateUsers(user);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') idUser: string): Promise<DtoBaseResponse>{
        return this.usersService.deleteUsers(idUser);
    }
}
