import { Injectable } from '@nestjs/common';
import { donaciones } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportService {

    constructor(private prismaService: PrismaService) { }

    async getReport(): Promise<any[]> {
        const allData = await this.prismaService.donaciones.findMany({
            include: {
                donaciones_motivo: true, // Incluir la relación de motivos
            },
            orderBy: {
                donaciones_fecha_alta: 'asc',
            },
        });
    
        // Paso 2: Formatear las fechas para eliminar la hora y mantener solo la fecha
        const formattedData = allData.map(item => ({
            ...item,
            donaciones_fecha_alta: new Date(item.donaciones_fecha_alta.toISOString().split('T')[0]), // Resetear la hora a medianoche
        }));
    
        // Paso 3: Agrupar los registros por fecha formateada y motivo
        const groupedByDate = formattedData.reduce((acc, item) => {
            const fechaKey = item.donaciones_fecha_alta.toISOString().split('T')[0]; // Usar la fecha sin hora como clave
            if (!acc[fechaKey]) {
                acc[fechaKey] = [];
            }
            acc[fechaKey].push(item);
            return acc;
        }, {});
    
        // Paso 4: Sumar las cantidades para cada grupo por fecha y motivo
        const finalResult = Object.keys(groupedByDate).map(fecha => {
            const groupedByMotivo = groupedByDate[fecha].reduce((acc, item) => {
                const motivoKey = item.donaciones_motivo_id;
                if (!acc[motivoKey]) {
                    acc[motivoKey] = {
                        donaciones_fecha_alta: item.donaciones_fecha_alta,
                        donaciones_motivo_id: motivoKey,
                        donaciones_almacen_cantidad: 0,
                        donaciones_motivo: item.donaciones_motivo,
                    };
                }
                acc[motivoKey].donaciones_almacen_cantidad += item.donaciones_almacen_cantidad;
                return acc;
            }, {});
    
            return {
                fecha: new Date(fecha),
                datos: Object.values(groupedByMotivo),
            };
        });
    
        return finalResult;
    }
}

