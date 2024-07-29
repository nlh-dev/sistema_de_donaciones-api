import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainLoadModule } from './main-load/main-load.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AlmacenModule } from './almacen/almacen.module';
import { DonacionesModule } from './donaciones/donaciones.module';

@Module({
  imports: [MainLoadModule, UsersModule, AlmacenModule, DonacionesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
