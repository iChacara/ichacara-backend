import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { PrismaService } from './database/prisma.service';
import { UserModel } from './models/user-model';
import { PrismaUserModel } from './models/prisma/prisma-user-model';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: UserModel,
      useClass: PrismaUserModel,
    },
  ],
})
export class AppModule {}
