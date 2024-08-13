import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DonacionesService } from './donaciones.service';
import { donaciones, donaciones_motivo, donaciones_tipos } from '@prisma/client';
import { DtoBaseResponse } from 'src/dtos/base-response.dto';
import { DtoAddDonaciones, DtoUpdateDonaciones } from 'src/dtos/donaciones.dto';

@Controller('donaciones')
export class DonacionesController {
    constructor(private donacionesService: DonacionesService){}

    @Get()
    async getDonations(): Promise<donaciones[]>{
        return await this.donacionesService.getDonaciones();
    }
    // @Get('/:id')
    // async getOneDonations(@Param('id') id: string): Promise<donaciones>{
    //     return await this.donacionesService.getOneDonaciones(id);
    // }
    @Get('/motivos')
    async getMotivos(): Promise<donaciones_motivo[]>{
        return await this.donacionesService.getDonacionesMotivo();
    }
    @Get('/tipos')
    async getTypes(): Promise<donaciones_tipos[]>{
        return await this.donacionesService.getDonacionesTipos();
    }

    @Post()
    async createDonation(@Body() donation: DtoAddDonaciones): Promise<DtoBaseResponse>{
        return await this.donacionesService.createDonaciones(donation);
    }

    @Put()
    async updateDonation(@Body() donation: DtoUpdateDonaciones): Promise<DtoBaseResponse>{
        return await this.donacionesService.updateDonaciones(donation);
    }

    @Delete('/:id')
    async deleteDonation(@Param('id') donationId: string): Promise<DtoBaseResponse>{
        return this.donacionesService.deleteDonaciones(donationId);
    }
}
