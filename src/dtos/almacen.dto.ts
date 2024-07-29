import { IsDate, IsNumber, IsString } from "class-validator";

export class DtoAddAlmacen {
    @IsString() 
    almacenNombre: string;
    @IsNumber()
    almacenCantidad:number;
    @IsNumber()
    almacenTipo:number;
    @IsNumber()
    almacenEstado:number;
    @IsDate() 
    almacenFechaExpiracion: Date;
}

export class DtoUpdateAlmacen extends DtoAddAlmacen{
    @IsNumber()
    almacenId: number;
}