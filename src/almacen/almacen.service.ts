import { BadRequestException, Injectable } from '@nestjs/common';
import { almacen, insumos_estado } from '@prisma/client';
import { DtoAddAlmacen, DtoUpdateAlmacen } from 'src/dtos/almacen.dto';
import { DtoBaseResponse } from 'src/dtos/base-response.dto';
import { baseResponse } from 'src/dtos/baseResponse';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlmacenService {
    constructor(private prismaService: PrismaService) { }

    async getAlmacen(): Promise<almacen[]> {
        return await this.prismaService.almacen.findMany({
            include: {
                insumos_estado: true
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
            throw new BadRequestException('No se pudo crear el alcamen.')
        }

        baseResponse.message = 'Almacen creado exitosamente.'
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
            throw new BadRequestException('No se pudo actualizar el alcamen.')
        }

        baseResponse.message = 'Almacen actualizado exitosamente.'
        return baseResponse;
    }

    async deleteAlmacen(almacenId: string): Promise<DtoBaseResponse> {
        const deleteAlmacen = await this.prismaService.almacen.delete({
            where: {
                almacen_id: Number(almacenId)
            }
        });

        if (!deleteAlmacen) {
            throw new BadRequestException('No se pudo eliminado el alcamen.')
        }

        baseResponse.message = 'Almacen eliminado exitosamente.'
        return baseResponse;
    }
}
