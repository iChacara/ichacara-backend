import { Module } from '@nestjs/common';
import { LessorController } from './lessor.controller';
import { LessorService } from './lessor.service';
import { PrismaService } from 'src/_database/prisma.service';
import { Logger } from 'winston';

// Importe outros módulos necessários, como TypeORM, Prisma, ou qualquer outro
@Module({
  controllers: [LessorController], // O controlador do Lessor
  providers: [LessorService, PrismaService, Logger], // O serviço do Lessor
  exports: [LessorService],
})
export class LessorModule {}
