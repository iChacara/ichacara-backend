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
import { NotFoundException } from '@nestjs/common/exceptions';
import { AlterUserDTO, CreateUserDTO, GetUserDTO } from './dto/_index';
import { FormatedUser } from './user';
import { UserService } from './user.service';
import { AuthDTO } from './dto/auth.dto';
import { Public } from '../guards/metadata';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiTags('User')
  @Public()
  @Post()
  async post(@Body() body: CreateUserDTO): Promise<FormatedUser> {
    const user = await this.userService.post(body);

    return user;
  }

  @ApiTags('User')
  @Public()
  @Post('/auth')
  async auth(@Body() body: AuthDTO): Promise<{ message: string; data: any }> {
    const user = await this.userService.auth(body);

    return user;
  }

  @ApiTags('User')
  @Get()
  async get(@Query() filters: GetUserDTO): Promise<FormatedUser[]> {
    const users = await this.userService.getBy(filters);

    return users;
  }

  @Put(':id')
  @ApiTags('User')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID único do usuário a ser atualizado.',
    example: '9bce8538-de85-4f3d-a884-69014d0c1798',
  })
  async put(
    @Param('id') id: string,
    @Body() body: AlterUserDTO,
  ): Promise<FormatedUser> {
    const users = await this.userService.put(id, body);

    return users;
  }

  @ApiTags('User')
  @Delete()
  async delete(@Query('id') id: string): Promise<FormatedUser> {
    const user = await this.userService.delete({ id: id });

    return user;
  }
}
