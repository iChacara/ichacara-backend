import { Module } from '@nestjs/common';
import { LessorController } from './lessor.controller';
import { LessorService } from './lessor.service';

// Importe outros módulos necessários, como TypeORM, Prisma, ou qualquer outro
@Module({
  imports: [], // Se precisar de outros módulos
  controllers: [LessorController], // O controlador do Lessor
  providers: [LessorService], // O serviço do Lessor
})
export class LessorModule {}
