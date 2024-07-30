import { IsNumber, IsString } from "class-validator";
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
}

export class DtoUpdateUsers extends DtoCreateUsers {
    @IsString()
    password: string;
    @IsNumber()
    idUsers: number;
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