import { Logger, Module } from '@nestjs/common';
import { PrismaService } from 'src/_database/prisma.service';
import { PostController } from './post.controller';
import { PostService } from './services/post.service';

@Module({
  controllers: [PostController],
  providers: [PrismaService, PostService, Logger],
  exports: [PostService],
})
export class PostModule {}
