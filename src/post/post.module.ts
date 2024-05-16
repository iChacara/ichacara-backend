import { Logger, Module } from '@nestjs/common';
import { PrismaService } from 'src/_database/prisma.service';
import { PostController } from './post.controller';
import { PostService } from './services/post.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { S3Service } from 'src/services/s3.service';

@Module({
  controllers: [PostController],
  providers: [PrismaService, PostService, Logger, S3Service],
  imports: [NestjsFormDataModule],
  exports: [PostService],
})
export class PostModule {}
