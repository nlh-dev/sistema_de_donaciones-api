import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Authenticate, DtoAuth } from 'src/dtos/users.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post()
    async authenticate(@Body() authUser: DtoAuth) : Promise<Authenticate> {
        return await this.authService.authenticate(authUser);
    }
}
