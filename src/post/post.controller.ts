import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDTO } from './dtos';
import { PostService } from './services/post.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import 'multer';
import { FormDataRequest } from 'nestjs-form-data';
import { S3Service } from '../services/s3.service';
@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
    private s3Service: S3Service,
  ) {}

  @Post()
  @ApiTags('Post')
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({
    description: 'Image file and post creation data',
    schema: {
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
  })
  @UseInterceptors(FilesInterceptor('images'))
  @FormDataRequest()
  async post(@Body() body: CreatePostDTO): Promise<any> {
    try {
      const createdPost = this.postService.createPost(body);
      console.log(createdPost);
      return;
    } catch (e) {
      console.error({ e });
    }
  }

  @Post('load')
  @FormDataRequest()
  async getHello(@Body() testDto: any): Promise<any> {
    try {
      console.log(testDto.images[0].originalName);
      const result = await this.s3Service.uploadFile(
        testDto.images[0].buffer,
        'png',
        'lessor-50/post-30',
      );
      if (result.success) {
        return {
          message: 'Imagens submetidas com sucesso!',
        };
      }
    } catch (e) {
      console.log(e);
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
