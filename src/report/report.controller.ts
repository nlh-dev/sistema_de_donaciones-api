import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';
import { donaciones } from '@prisma/client';

@Controller('report')
export class ReportController {

    constructor(private reportService: ReportService){}

    @Get()
    async getReport(): Promise<any[]>{
        return await this.reportService.getReport();
    }
}
