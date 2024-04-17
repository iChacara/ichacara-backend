import {
  Body,
  Controller,
  Delete,
  Get,
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
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post()
  async post(@Body() body: CreateUserDTO): Promise<FormatedUser> {
    const user = await this.userService.post(body);

    return user;
  }

  @ApiTags('explo')
  @Public()
  @Post('/auth')
  async auth(@Body() body: AuthDTO): Promise<{ message: string; data: any }> {
    const user = await this.userService.auth(body);

    return user;
  }

  @Get()
  async get(@Query() filters: GetUserDTO): Promise<FormatedUser[]> {
    if (
      filters.id === undefined &&
      filters.email === undefined &&
      filters.name === undefined
    ) {
      throw new NotFoundException('Nenhum parâmetro de filtro fornecido.');
    }

    const users = await this.userService.getBy(filters);

    return users;
  }

  @Put()
  async put(@Body() body: AlterUserDTO): Promise<FormatedUser> {
    const users = await this.userService.put(body);

    return users;
  }

  @Delete()
  async delete(@Query('id') id: string): Promise<FormatedUser> {
    const user = await this.userService.delete({ id: id });

    return user;
  }
}
