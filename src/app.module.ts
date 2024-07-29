import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainLoadModule } from './main-load/main-load.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [MainLoadModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
