import { BadRequestException, Injectable } from '@nestjs/common';
import { DtoBaseResponse } from 'src/dtos/base-response.dto';
import { baseResponse } from 'src/dtos/baseResponse';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MainLoadService {

    constructor(private prismaService: PrismaService) { }

    async mainLoad(): Promise<DtoBaseResponse> {
        const createRoles = await this.prismaService.users_roles.createMany({
            data: [
                {
                    roles_nombre: 'Administrador'
                },
                {
                    roles_nombre: 'Encargado General'
                },
                {
                    roles_nombre: 'Encargado de Almacen'
                },
                {
                    roles_nombre: 'Colaborador'
                },
            ]
        });

        const createUsers = await this.prismaService.users.createMany({
            data: [
                {
                    usuario: 'admin',
                    password: 'admin',
                    nombre: 'admin',
                    apellido: 'admin',
                    users_role_id: 1,
                    users_status: true
                },
                {
                    usuario: 'bmerchan05',
                    password: '05136299',
                    nombre: 'Berenice',
                    apellido: 'Merchan',
                    users_role_id: 3,
                    users_status: true
                },
                {
                    usuario: 'hnavarro331',
                    password: 'h1309navarro',
                    nombre: 'Hector',
                    apellido: 'Navarro',
                    users_role_id: 1,
                    users_status: true
                },
                {
                    usuario: 'caro04bracho',
                    password: '15057399',
                    nombre: 'Carolina',
                    apellido: 'Bracho',
                    users_role_id: 2,
                    users_status: true
                }
            ]
        });

        const createEstados = await this.prismaService.estados.createMany({
            data: [
                {
                    estados_nombre: 'En Proceso'
                },
                {
                    estados_nombre: 'Entregada'
                },
                {
                    estados_nombre: 'Rechazada'
                }
            ]
        });

        const createInsumos = await this.prismaService.insumos_estado.createMany({
            data: [
                {
                    insumo_estado_nombre: 'Optimas Condiciones'
                },
                {
                    insumo_estado_nombre: 'Excelentes Condiciones'
                },
                {
                    insumo_estado_nombre: 'Condiciones Ideales'
                },
                {
                    insumo_estado_nombre: 'Condiciones Deplorables'
                }
            ]
        });

        const createMotivos = await this.prismaService.donaciones_motivo.createMany({
            data: [
                {
                    motivo: 'Entrega de Donación'
                },
                {
                    motivo: 'Recibo de Donación'
                }
            ]
        });

        const createDonacionesTipo = await this.prismaService.donaciones_tipos.createMany({
            data: [
                {
                    tipo_donaciones_nombre: 'Insumos Médicos'
                },
                {
                    tipo_donaciones_nombre: 'Insumos Hospitalarios'
                },
                {
                    tipo_donaciones_nombre: 'Insumos Quirurgicos'
                },
                {
                    tipo_donaciones_nombre: 'Ropa'
                },
                {
                    tipo_donaciones_nombre: 'Calzados'
                },
                {
                    tipo_donaciones_nombre: 'Alimentos Perecederos'
                },
                {
                    tipo_donaciones_nombre: 'Juguetes'
                }
            ]
        });

        const createAlmacen = await this.prismaService.almacen.createMany({
            data: [
                {
                    almacen_nombre: 'Acetaminofén 100mg',
                    almacen_cantidad: 25,
                    almacen_tipo: 1,
                    almacen_estado: 1,
                    almacen_fecha_de_expiracion: new Date('2027-07-09'),
                    almacen_dosis: 1,
                    almacen_descripcion: '',
                },
                {
                    almacen_nombre: 'Dexametasona',
                    almacen_cantidad: 10,
                    almacen_tipo: 1,
                    almacen_estado: 2,
                    almacen_fecha_de_expiracion: new Date('2031-07-16'),
                    almacen_descripcion: '',
                    almacen_dosis: 1,
                },
                {
                    almacen_nombre: 'PediaSure 400g',
                    almacen_cantidad: 3,
                    almacen_tipo: 6,
                    almacen_estado: 2,
                    almacen_fecha_de_expiracion: new Date('2026-07-17'),
                    almacen_descripcion: '',
                    almacen_dosis: 1,
                }
            ]
        });

        const createDonaciones = await this.prismaService.donaciones.createMany({
            data: [
                {
                    donaciones_tipo_id: 6,
                    donaciones_motivo_id: 1,
                    donaciones_nombre_receptor: 'Luis Gainza',
                    donaciones_cedula_receptor: 29900012,
                    donaciones_telefono_receptor: '0424-6394567',
                    donaciones_edad_receptor: 22,
                    donaciones_parroquia: 'Francisco Bustamante',
                    donaciones_diagnostico_receptor: 'Petición a razon Diagnostico del hijo: en desnutrición',
                    donaciones_almacen_id: 3,
                    donaciones_almacen_cantidad: 3,
                    donaciones_fecha_alta: new Date('2024-07-15 14:47:21'),
                    donaciones_estado_id: 1
                },
                {
                    donaciones_tipo_id: 1,
                    donaciones_motivo_id: 1,
                    donaciones_nombre_receptor: 'Carlos Navarro',
                    donaciones_cedula_receptor: 26713456,
                    donaciones_telefono_receptor: '0424-0034956',
                    donaciones_edad_receptor: 28,
                    donaciones_parroquia: 'Raúl Leoni',
                    donaciones_diagnostico_receptor: 'Inflamación y artritis',
                    donaciones_almacen_id: 2,
                    donaciones_almacen_cantidad: 2,
                    donaciones_estado_id: 1,
                    donaciones_fecha_alta: new Date('2024-07-15 14:49:47')
                }
            ]
        })

        if (!createEstados) {
            throw new BadRequestException('Ha ocurrido un error al crear las donaciones')
        }
        if (!createDonaciones) {
            throw new BadRequestException('Ha ocurrido un error al crear las donaciones')
        }
        if (!createAlmacen) {
            throw new BadRequestException('Ha ocurrido un error al crear los almacenes')
        }
        if (!createDonacionesTipo) {
            throw new BadRequestException('Ha ocurrido un error al crear los donaciones tipo')
        }
        if (!createMotivos) {
            throw new BadRequestException('Ha ocurrido un error al crear los motivos')
        }
        if (!createInsumos) {
            throw new BadRequestException('Ha ocurrido un error al crear los insumos')
        }
        if (!createUsers) {
            throw new BadRequestException('Ha ocurrido un error al crear los usuarios')
        }
        if (!createRoles) {
            throw new BadRequestException('Ha ocurrido un error al crear los roles')
        }

        baseResponse.message = 'Data cargada exitosamente.'
        return baseResponse;
    }
}
