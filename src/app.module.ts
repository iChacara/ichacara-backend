import { Module, Logger } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [UserController],
  providers: [Logger],
})
export class AppModule {}
