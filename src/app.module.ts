import { Module } from '@nestjs/common';
import { LesseeController } from './controllers/lessee.controller';
import { LesseeService } from './services/lessee.service';
import { PrismaService } from './services/prisma.service';
import { LessorService } from './services/lessor.service';
import { UtilsService } from './services/utils.service';
import { LessorController } from './controllers/lessor.controller';

@Module({
  imports: [],
  controllers: [LesseeController, LessorController],
  providers: [PrismaService, LesseeService, LessorService, UtilsService],
})
export class AppModule {}
