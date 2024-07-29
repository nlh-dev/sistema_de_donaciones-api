import { IsDate, IsNumber, IsString } from "class-validator"

export class DtoAddDonaciones {
    @IsNumber()
    donacionesTipoId: number;
    @IsNumber()
    donacionesMotivoId: number;
    @IsString()
    donacionesNombreReceptor: string;
    @IsNumber()
    donacionesCedulaReceptor: number;
    @IsString()
    donacionesTelefonoReceptor: string;
    @IsNumber()
    donacionesEdadReceptor: number;
    @IsString()
    donacionesParroquia: string;
    @IsString()
    donacionesDiagnosticoReceptor: string;
    @IsNumber()
    donacionesAlmacenId: number;
    @IsNumber()
    donacionesAlmacenCantidad: number;
    @IsString()
    donacionesDescripcion: string;
    @IsDate()
    donacionesFechaAlta: Date
}

export class DtoUpdateDonaciones extends DtoAddDonaciones {
    @IsNumber()
    donationId: number;
}