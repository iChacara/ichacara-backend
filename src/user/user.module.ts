import { Logger, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from '../_database/prisma.service';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService, Logger],
  exports: [UserService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1w' },
    }),
  ],
})
export class UserModule {}
