import { BadRequestException, Injectable } from '@nestjs/common';
import { almacen, insumos_estado } from '@prisma/client';
import { DtoAddAlmacen, DtoUpdateAlmacen } from 'src/dtos/almacen.dto';
import { DtoBaseResponse } from 'src/dtos/base-response.dto';
import { baseBadResponse, baseResponse } from 'src/dtos/baseResponse';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlmacenService {
    constructor(private prismaService: PrismaService) { }

    async getAlmacen(): Promise<almacen[]> {
        return await this.prismaService.almacen.findMany({
            include: {
                insumos_estado: true,
                donaciones_tipos: true
            }
        });
    }


    async getInsumos(): Promise<insumos_estado[]> {
        return await this.prismaService.insumos_estado.findMany();
    }

    async addAlmacen(almacen: DtoAddAlmacen): Promise<DtoBaseResponse> {
        const createAlmacen = await this.prismaService.almacen.create({
            data: {
                almacen_nombre: almacen.almacenNombre,
                almacen_cantidad: almacen.almacenCantidad,
                almacen_tipo: almacen.almacenTipo,
                almacen_estado: almacen.almacenEstado,
                almacen_fecha_de_expiracion: almacen.almacenFechaExpiracion
            }
        });

        if (!createAlmacen) {
            baseBadResponse.message = 'No se pudo agregar el insumo.'
            return baseBadResponse;
        }

        baseResponse.message = 'Insumo agregado exitosamente.'
        return baseResponse;
    }

    async updateAlmacen(almacen: DtoUpdateAlmacen): Promise<DtoBaseResponse> {
        const updateAlmacen = await this.prismaService.almacen.update({
            data: {
                almacen_nombre: almacen.almacenNombre,
                almacen_cantidad: almacen.almacenCantidad,
                almacen_tipo: almacen.almacenTipo,
                almacen_estado: almacen.almacenEstado,
                almacen_fecha_de_expiracion: almacen.almacenFechaExpiracion
            },
            where: {
                almacen_id: almacen.almacenId
            }
        });

        if (!updateAlmacen) {
            baseBadResponse.message = 'No se pudo actualizar el Insumo.'
            return baseBadResponse;
        }

        baseResponse.message = 'Insumo actualizado exitosamente.'
        return baseResponse;
    }

    async deleteAlmacen(almacenId: string): Promise<DtoBaseResponse> {
        const deleteAlmacen = await this.prismaService.almacen.delete({
            where: {
                almacen_id: Number(almacenId)
            }
        });

        if (!deleteAlmacen) {
            baseBadResponse.message = 'No se pudo eliminado el Insumo.'
            return baseBadResponse;
        }

        baseResponse.message = 'Insumo eliminado exitosamente.'
        return baseResponse;
    }
}
