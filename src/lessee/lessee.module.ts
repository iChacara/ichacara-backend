import { Logger, Module } from '@nestjs/common';
import { LesseeController } from './lessee.controller';
import { PrismaService } from 'src/_database/prisma.service';
import { LesseeService } from './services/lessee.service';

@Module({
  controllers: [LesseeController],
  providers: [LesseeService, PrismaService, Logger],
  exports: [LesseeService],
})
export class LesseeModule {}
