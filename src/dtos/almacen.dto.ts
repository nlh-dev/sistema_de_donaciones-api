import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class DtoAddAlmacen {
    @IsString() 
    almacenNombre: string;
    @IsNumber()
    almacenCantidad:number;
    @IsString() 
    almacenDescripcion: string;
    @IsNumber()
    almacenDosis:number;
    @IsNumber()
    almacenTipo:number;
    @IsNumber()
    almacenEstado:number;

    @Transform(({ value }) => new Date(value))
    @IsDate() 
    almacenFechaExpiracion: Date;
}

export class DtoUpdateAlmacen extends DtoAddAlmacen{
    @IsNumber()
    almacenId: number;
}