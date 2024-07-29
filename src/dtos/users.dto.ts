import { IsNumber, IsString } from "class-validator";

export class DtoCreateUsers {
    @IsString()
    nombre: string;
    @IsString()
    apellido: string;
    @IsString()
    usuario: string;
    @IsString()
    password: string;
    @IsNumber()
    usersRoleId: number;
}

export class DtoUpdateUsers extends DtoCreateUsers {
    @IsString()
    contraseña: string;
    @IsNumber()
    idUsers: number;
}