import { Module } from '@nestjs/common';
import { LesseeController } from './controllers/lessee.controller';
import { LesseeService } from './services/lessee.service';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [LesseeController],
  providers: [PrismaService, LesseeService],
})
export class AppModule {}
