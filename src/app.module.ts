import { Module, Logger } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [Logger],
})
export class AppModule {}
