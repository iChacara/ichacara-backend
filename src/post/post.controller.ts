import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDTO } from './dtos';
import { PostService } from './services/post.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { FilesInterceptor } from '@nestjs/platform-express';
import 'multer';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @ApiTags('Post')
  @ApiOperation({ summary: 'Create a new post' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file and post creation data',
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        data: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Casa à Venda' },
            description: {
              type: 'string',
              example: 'Excelente casa em um bairro tranquilo',
            },
            routeInstruction: {
              type: 'string',
              example: 'Perto da escola primária, vire à direita no semáforo',
            },
            address: { type: 'string', example: '123, Rua das Flores' },
            street: { type: 'string', example: 'Rua das Flores' },
            district: { type: 'string', example: 'Jardim das Rosas' },
            city: { type: 'string', example: 'Cidade Nova' },
            UF: { type: 'string', example: 'SP' },
            CEP: { type: 'string', example: '12345-678' },
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('images'))
  @FormDataRequest()
  async post(
    @Body() body: CreatePostDTO,
    @UploadedFiles()
    images: Express.Multer.File[],
  ): Promise<any> {
    try {
      return;
      const createdPost = this.postService.createPost(body);
      console.log({ createdPost });

      const uploadedImagesKeys: string[] = [];
      for (const image of images) {
        const extension_aux = image.originalname.split('.');
        const extension = extension_aux[extension_aux.length - 1];
        const key = `post/${Date.now()}-uuid-do-post-criado.${extension}`;

        const s3 = new S3Client({
          endpoint: 'http://localstack-main:4566', // ou o IP do Docker se necessário
          region: 'us-east-1',
          credentials: {
            accessKeyId: 'S3RVER',
            secretAccessKey: 'S3RVER',
          },
          forcePathStyle: true,
        });
        const command = new PutObjectCommand({
          Bucket: 'ichacara',
          Key: key,
          Body: image.buffer,
        });
        const result = await s3.send(command);
        if (result.$metadata.httpStatusCode === 200) {
          uploadedImagesKeys.push(key);
        }
      }
      console.log({ uploadedImagesKeys });

      return;
    } catch (e) {
      console.error({ e });
    }
  }

  @Get()
  @ApiTags('Post')
  @ApiOperation({ summary: 'Get a list of posts' })
  @ApiResponse({ status: 200, description: 'Posts retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getAllPosts(): Promise<boolean> {
    return true;
  }

  @Get(':id')
  @ApiTags('Post')
  @ApiOperation({ summary: 'Get a specific post by ID' })
  @ApiResponse({ status: 200, description: 'Post retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid ID' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getPostById(@Param('id') id: string): Promise<boolean> {
    id;
    return true;
  }

  @Put(':id')
  @ApiTags('Post')
  @ApiOperation({ summary: 'Update an existing post by ID' })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({
    type: CreatePostDTO,
    examples: {
      example1: {
        summary: 'Update Post',
        value: {
          title: 'Updated Post Title',
          description: 'Updated description',
          routeInstruction: 'Turn right at the fountain',
          address: '456 New St',
          street: 'New St',
          district: 'Suburbs',
          city: 'New City',
          UF: 'NY',
          CEP: '98765-432',
          images: ['http://example.com/new_image.jpg'],
        },
      },
    },
  })
  async updatePost(
    @Param('id') id: string,
    @Body() body: CreatePostDTO,
  ): Promise<boolean> {
    id;
    body;
    return true;
  }

  @Delete(':id')
  @ApiTags('Post')
  @ApiOperation({ summary: 'Delete a specific post by ID' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deletePost(@Param('id') id: string): Promise<boolean> {
    id;
    return true;
  }
}
