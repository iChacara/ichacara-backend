import { Logger, Module } from '@nestjs/common';
import { PrismaService } from 'src/_database/prisma.service';
import { PostController } from './post.controller';
import { PostService } from './services/post.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [PostController],
  providers: [PrismaService, PostService, Logger],
  imports: [NestjsFormDataModule],
  exports: [PostService],
})
export class PostModule {}
