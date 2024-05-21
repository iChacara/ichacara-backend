import { Logger, Module } from '@nestjs/common';
import { PrismaService } from 'src/_database/prisma.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './services/appointment.service';

@Module({
  controllers: [AppointmentController],
  providers: [PrismaService, AppointmentService, Logger],
  imports: [NestjsFormDataModule],
  exports: [AppointmentService],
})
export class AppointmentModule {}
