import { Controller, Get } from '@nestjs/common';
import { DtoBaseResponse } from 'src/dtos/base-response.dto';
import { baseResponse } from 'src/dtos/baseResponse';

@Controller('main-load')
export class MainLoadController {

    @Get()
    async mainLoad(): Promise<DtoBaseResponse>{
        return baseResponse;
    }
}
