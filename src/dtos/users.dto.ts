import { IsBoolean, IsNumber, IsString } from "class-validator";
import { DtoBaseResponse } from "./base-response.dto";
import { users } from "@prisma/client";

export class DtoCreateUsers {
    @IsString()
    nombre: string;
    @IsString()
    apellido: string;
    @IsString()
    usuario: string;
    @IsNumber()
    usersRoleId: number;
    @IsString()
    password: string;
}

export class DtoUpdateUsers extends DtoCreateUsers {
    @IsNumber()
    idUsers: number;
    @IsBoolean()
    active: boolean;
}

export class Authenticate extends DtoBaseResponse{
    userAuthenticate: users
}

export class DtoAuth {
    @IsString()
    usuario: string;
    @IsString()
    password: string
}