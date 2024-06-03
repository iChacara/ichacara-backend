import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreatePostDTO } from './dtos';
import { PostService } from './services/post.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import 'multer';
import { UpdatePostDTO } from './dtos/update-post.dto';
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @ApiTags('Post')
  @ApiOperation({ summary: 'Create a new post' })
  async post(@Body() body: CreatePostDTO): Promise<any> {
    return this.postService.createPost(body);
  }

  @Get()
  @ApiTags('Post')
  @ApiOperation({ summary: 'Get a list of posts' })
  @ApiResponse({ status: 200, description: 'Posts retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getAllPosts(@Query('lessorId') lessorId: string): Promise<any> {
    return this.postService.getAllPosts(lessorId);
  }

  @Get(':id')
  @ApiTags('Post')
  @ApiOperation({ summary: 'Get a specific post by ID' })
  @ApiResponse({ status: 200, description: 'Post retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid ID' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getPostById(@Param('id') id: string): Promise<any> {
    return this.postService.getPost(id);
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
    @Body() body: UpdatePostDTO,
  ): Promise<any> {
    return this.postService.updatePost(id, body);
  }

  @Delete(':id')
  @ApiTags('Post')
  @ApiOperation({ summary: 'Delete a specific post by ID' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deletePost(@Param('id') id: string): Promise<any> {
    return this.postService.deletePost(id);
  }
}
