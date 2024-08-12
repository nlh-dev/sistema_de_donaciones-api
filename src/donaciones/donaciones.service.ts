import { BadRequestException, Injectable } from '@nestjs/common';
import { donaciones, donaciones_motivo, donaciones_tipos } from '@prisma/client';
import { DtoBaseResponse } from 'src/dtos/base-response.dto';
import { baseBadResponse, baseResponse } from 'src/dtos/baseResponse';
import { DtoAddDonaciones, DtoUpdateDonaciones } from 'src/dtos/donaciones.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DonacionesService {
    constructor(private prismaService: PrismaService){}

    async getDonaciones(): Promise<donaciones[]>{
        return await this.prismaService.donaciones.findMany({
            include: {
                donaciones_motivo: true,
                donaciones_tipos: true
            }
        });
    }
    async getOneDonaciones(id: string): Promise<donaciones>{
        return await this.prismaService.donaciones.findFirst({
            where:{
                donaciones_ID: Number(id)
            },
            include: {
                donaciones_motivo: true,
                donaciones_tipos: true
            }
        });
    }
    async getDonacionesMotivo(): Promise<donaciones_motivo[]>{
        return await this.prismaService.donaciones_motivo.findMany();
    }
    async getDonacionesTipos(): Promise<donaciones_tipos[]>{
        return await this.prismaService.donaciones_tipos.findMany();
    }

    async createDonaciones(donation: DtoAddDonaciones): Promise<DtoBaseResponse>{
        const createDonation = await this.prismaService.donaciones.create({
            data: {
                donaciones_tipo_id: donation.donacionesTipoId,
                donaciones_motivo_id: donation.donacionesMotivoId,
                donaciones_nombre_receptor: donation.donacionesNombreReceptor,
                donaciones_cedula_receptor: donation.donacionesCedulaReceptor,
                donaciones_telefono_receptor: donation.donacionesTelefonoReceptor,
                donaciones_edad_receptor: donation.donacionesEdadReceptor,
                donaciones_parroquia: donation.donacionesParroquia,
                donaciones_diagnostico_receptor: donation.donacionesDiagnosticoReceptor,
                donaciones_almacen_id: donation.donacionesAlmacenId,
                donaciones_almacen_cantidad: donation.donacionesAlmacenCantidad,
                donaciones_descripcion: donation.donacionesDescripcion,
                donaciones_fecha_alta:donation.donacionesFechaAlta
            }
        });

        if(!createDonation){
            baseBadResponse.message = 'Ha ocurrido un error al crear la donación.';
            return baseBadResponse;
        }

        baseResponse.message = 'Donación creada exitosamente.';
        return baseResponse;
    }

    async updateDonaciones(donation: DtoUpdateDonaciones): Promise<DtoBaseResponse>{
        const updateDonation = await this.prismaService.donaciones.update({
            data: {
                donaciones_tipo_id: donation.donacionesTipoId,
                donaciones_motivo_id: donation.donacionesMotivoId,
                donaciones_nombre_receptor: donation.donacionesNombreReceptor,
                donaciones_cedula_receptor: donation.donacionesCedulaReceptor,
                donaciones_telefono_receptor: donation.donacionesTelefonoReceptor,
                donaciones_edad_receptor: donation.donacionesEdadReceptor,
                donaciones_parroquia: donation.donacionesParroquia,
                donaciones_diagnostico_receptor: donation.donacionesDiagnosticoReceptor,
                donaciones_almacen_id: donation.donacionesAlmacenId,
                donaciones_almacen_cantidad: donation.donacionesAlmacenCantidad,
                donaciones_descripcion: donation.donacionesDescripcion,
                donaciones_fecha_alta:donation.donacionesFechaAlta
            },
            where: {
                donaciones_ID: donation.donationId
            }
        });

        if(!updateDonation){
            baseBadResponse.message = 'Ha ocurrido un error al actualizar la donación.';
            return baseBadResponse;
        }

        baseResponse.message = 'Donación actualizada exitosamente.';
        return baseResponse;
    }

    async deleteDonaciones(donacionId: string): Promise<DtoBaseResponse>{
        const deleteDonacion = await this.prismaService.donaciones.delete({
            where: {
                donaciones_ID: Number(donacionId)
            }
        });

        if(!deleteDonacion){
            baseBadResponse.message = 'Ha ocurrido un error al eliminar la donación.';
            return baseBadResponse;
        }
        baseResponse.message = 'Donación eliminada.';
        return baseResponse;
    }
}
