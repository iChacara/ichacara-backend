import { Module } from '@nestjs/common';
import { LesseeController } from './controllers/lessee.controller';
import { LesseeService } from './services/lessee.service';
import { PrismaService } from './services/prisma.service';
import { LessorService } from './services/lessor.service';
import { UtilsService } from './services/utils.service';
import { LessorController } from './controllers/lessor.controller';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [],
  controllers: [LesseeController, LessorController, UserController],
  providers: [
    PrismaService,
    LesseeService,
    LessorService,
    UtilsService,
    UserService,
  ],
})
export class AppModule {}
