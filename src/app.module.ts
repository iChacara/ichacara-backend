import { Module, Logger } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { LessorModule } from './lessor/lessor.module';
import { LessorController } from './lessor/lessor.controller';

@Module({
  imports: [UserModule, PostModule, LessorModule],
  controllers: [UserController, PostController, LessorController],
  providers: [Logger],
})
export class AppModule {}
