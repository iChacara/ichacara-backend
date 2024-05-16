import { Module, Logger } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { LessorModule } from './lessor/lessor.module';
import { LessorController } from './lessor/lessor.controller';
import { LesseeModule } from './lessee/lessee.module';
import { LesseeController } from './lessee/lessee.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { S3Service } from './services/s3.service';

@Module({
  imports: [
    UserModule,
    PostModule,
    LessorModule,
    LesseeModule,
    NestjsFormDataModule,
  ],
  controllers: [
    UserController,
    PostController,
    LessorController,
    LesseeController,
  ],
  providers: [Logger, S3Service],
})
export class AppModule {}
