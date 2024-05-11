import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDTO } from './dtos';
import { PostService } from './services/post.service';
// import { Post as PostInterface } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBucketCommand, S3Client } from '@aws-sdk/client-s3';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @ApiTags('Post')
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({
    type: CreatePostDTO,
    examples: {
      example1: {
        summary: 'Basic Post',
        value: {
          title: 'My New Post',
          description: 'This is a description',
          routeInstruction: 'Turn left at the big tree',
          address: '123 Main St',
          street: 'Main St',
          district: 'Downtown',
          city: 'Metropolis',
          UF: 'SP',
          CEP: '12345-678',
          images: ['http://example.com/image1.jpg'],
        },
      },
    },
  })
  async post(@Body() body: CreatePostDTO): Promise<any> {
    body;
    const s3 = new S3Client({
      endpoint: 'http://localstack-main:4566', // ou o IP do Docker se necessário
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'S3RVER',
        secretAccessKey: 'S3RVER',
      },
      forcePathStyle: true,
    });
    const command = new CreateBucketCommand({
      Bucket: 'meu-novo-bucket',
      ACL: 'public-read',
    });
    await s3.send(command);
    console.log('Bucket criado com sucesso!');
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
