import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AlmacenService } from './almacen.service';
import { almacen, insumos_estado } from '@prisma/client';
import { DtoAddAlmacen, DtoUpdateAlmacen } from 'src/dtos/almacen.dto';
import { DtoBaseResponse } from 'src/dtos/base-response.dto';

@Controller('almacen')
export class AlmacenController {

    constructor(private almacenService: AlmacenService){}

    @Get()
    async getUsers(): Promise<almacen[]>{
        return await this.almacenService.getAlmacen();
    }
    @Get('/insumos')
    async getRoles(): Promise<insumos_estado[]>{
        return await this.almacenService.getInsumos();
    }

    @Post()
    async createAlmacen(@Body() user: DtoAddAlmacen): Promise<DtoBaseResponse>{
        return await this.almacenService.addAlmacen(user);
    }

    @Put()
    async updateAlmacen(@Body() user: DtoUpdateAlmacen): Promise<DtoBaseResponse>{
        return await this.almacenService.updateAlmacen(user);
    }

    @Delete('/:id')
    async deleteAlmacen(@Param('id') almacenId: string): Promise<DtoBaseResponse>{
        return this.almacenService.deleteAlmacen(almacenId);
    }
}
