import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from '../_database/prisma.service';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class UserModule {}
