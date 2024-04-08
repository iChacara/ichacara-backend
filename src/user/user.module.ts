import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from '../_database/prisma.service';
import { UserModel } from './model/user-model';
import { PrismaUserModel } from './model/prisma/prisma-user-model';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    UserService,
    {
      provide: UserModel,
      useClass: PrismaUserModel,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
